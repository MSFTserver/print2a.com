import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import toast from 'react-hot-toast'

import { Words, Button, Frame } from 'arwes'

// Import Chonky
import {
  setChonkyDefaults,
  FileBrowser,
  FileContextMenu,
  FileList,
  FileNavbar,
  FileToolbar,
  ChonkyActions,
} from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import ControlledPopup from '../../shared/ControlledPopup/ControlledPopup'
setChonkyDefaults({ iconComponent: ChonkyIconFA })

const print2aApiEndpoint = 'https://api.print2a.com'

// Render the file browser
function ChonkyBrowse(props) {
  const location = useLocation()
  const [prevURL, setPrevURL] = useState([
    location.pathname.replace('/browse/', ''),
  ])

  let newPath = `${print2aApiEndpoint}/print2a`
  let fileName = null
  const newChain = {
    id: 'print2a',
    name: 'print2a',
    isDir: true,
  }

  let path = location.pathname
  if (path.split('/browse/').length > 1) {
    path = path.replace('/browse/', '')
    newPath = `${print2aApiEndpoint}/print2a/${path}`
  }

  const [currentNodes, setCurrentNodes] = useState([])
  const [currentPath, setCurrentPath] = useState(newPath)
  const [folderChain, setFolderChain] = useState([newChain])

  // Define a handler for "open file" action
  const handleFileOpen = async (node) => {
    if (node.id === 'open_files' && node.payload.files[0].isDir) {
      const folder = node.payload.files[0]
      setCurrentPath(`${print2aApiEndpoint}/${folder.id}`)
    } else if (node.id === 'open_files' && !node.payload.files[0].isDir) {
      const folder = node.payload.files[0]
      fileName = folder.id.replace(/^.*[\\/]/, '')
      const fileExt = fileName.split('.').pop()
      let data
      toast.custom(
        (t) => (
          <Frame
            animate
            level={3}
            corners={3}
            layer="alert"
            show
            style={{ background: '#000' }}
          >
            <div className="frame-content">
              <Words> Opening File... </Words>
              <br />
              <Words> {fileName} </Words>
            </div>
          </Frame>
        ),
        {
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        },
      )
      if (['md', 'txt', 'pdf', 'png', 'jpg'].includes(fileExt.toLowerCase())) {
        data = await fetch(
          `${print2aApiEndpoint}/GetFile?fileLocation=${folder.id}`,
        )
        data = await data.text()
        props.setPopupFile(fileName, folder.id, fileExt, data)
        props.setShowPopup()
      } else if (['stl', 'obj'].includes(fileExt.toLowerCase())) {
        window.location.href = `/modelViewer?fileLocation=${folder.id.replace(
          'print2a/',
          '',
        )}`
      } else {
        props.setPopupFile(fileName, folder.id, fileExt, data)
        props.setShowPopup()
      }
    } else if (
      node.id === 'download_files' &&
      node.state.selectedFiles[0].isDir
    ) {
      const folder = node.state.selectedFiles[0]
      setCurrentPath(`CREATEZIP/${print2aApiEndpoint}/${folder.id}`)
      setCurrentPath(
        `${print2aApiEndpoint}/${folder.id
          .split('/')
          .slice(0, folder.id.split('/').length - 1)
          .join('/')}`,
      )
    } else if (
      node.id === 'download_files' &&
      !node.state.selectedFiles[0].isDir
    ) {
      const folder = node.state.selectedFiles[0]
      const sendToastId = toast.custom(
        (t) => (
          <Frame
            animate
            level={3}
            corners={3}
            layer="alert"
            style={{ background: '#000' }}
            show
          >
            <div className="frame-content">
              <Words>Sending File... </Words>
              <br />
              <Words>this could take a while</Words>
              <div id="dl-buttons" style={{}}>
                <Button
                  layer="primary"
                  onClick={() => {
                    toast.dismiss(t.id)
                  }}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </Frame>
        ),
        {
          duration: Infinity,
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        },
      )
      window.open(`${print2aApiEndpoint}/${folder.id}`, '_blank')
      toast.custom(
        (t) => {
          const divID = `download-link-${t.id}`
          const clipboardID = `clipboard-${t.id}`
          return (
            <Frame
              animate
              level={3}
              corners={3}
              layer="alert"
              show
              style={{ background: '#000' }}
            >
              <div className="frame-content">
                <Words>
                  if a tab does not open,
                  <br /> the file is available below
                </Words>
                <div id={divID} style={{ display: 'none' }}>
                  {`${print2aApiEndpoint}/${folder.id}`}
                </div>
                <input
                  id={clipboardID}
                  style={{
                    position: 'fixed',
                    bottom: '0',
                    right: '0',
                    pointerEvents: 'none',
                    opacity: '0',
                    transform: 'scale(0)',
                  }}
                />
                <div id="dl-buttons">
                  <Button
                    layer="primary"
                    onClick={() =>
                      window.open(
                        `${print2aApiEndpoint}/${folder.id}`,
                        '_blank',
                      )
                    }
                  >
                    Download
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    layer="primary"
                    onClick={() => {
                      const downloadLink = document.getElementById(divID)
                      const clipboard = document.getElementById(clipboardID)
                      clipboard.value = downloadLink.innerHTML
                      clipboard.select()
                      document.execCommand('copy')
                    }}
                  >
                    Copy URL
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    layer="primary"
                    onClick={() => {
                      toast.dismiss(t.id)
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </Frame>
          )
        },
        {
          id: sendToastId,
          duration: 60000,
        },
      )
    }
  }

  const formatApiResponse = (apiResponse) =>
    apiResponse.map((node) => ({
      id: node.id,
      name: node.name,
      isDir: node.isDir,
      path: node.path,
      size: node.size,
      childrenCount: node.childrenCount,
      modDate: new Date(node.mtime),
    }))

  useEffect(() => {
    const getData = async () => {
      if (!currentPath.startsWith('CREATEZIP')) {
        let navigateURL = currentPath
          .replace(print2aApiEndpoint, '')
          .replace('/print2a/', '')
          .replace('/print2a', '')
        const checkLocation = location.pathname.replace('/browse/', '')
        const lastPrevURL = prevURL.at(-1)
        if (checkLocation !== lastPrevURL) {
          navigateURL = checkLocation
        }
        const newURL = [...prevURL]
        newPath = navigateURL
        if (newPath === '') {
          newPath = '/browse'
        }
        if (navigateURL) {
          if (newURL.pop() !== navigateURL) {
            setPrevURL([...prevURL, newPath])
            if (navigateURL === '/browse') {
              setCurrentPath(`${print2aApiEndpoint}/print2a`)
              location.pathname = `/browse`
              window.history.pushState(``, ``, `/browse`)
            } else {
              setCurrentPath(`${print2aApiEndpoint}/print2a/${navigateURL}`)
              location.pathname = `/browse/${navigateURL}`
              window.history.pushState(``, ``, `/browse/${navigateURL}`)
            }
          }
        } else if (newURL.pop() !== '/browse') {
          setPrevURL([...prevURL, newPath])
          location.pathname = `/browse`
          window.history.pushState(``, ``, `/browse`)
        }
        fetch(currentPath)
          .then((response) => response.json())
          .then(
            (response) => {
              const folderChainArray = []
              const formattedResponse = formatApiResponse(response)
              setCurrentNodes(formattedResponse)
              const readableFolderChain = currentPath
                .replace(print2aApiEndpoint, '')
                .substring(1)
              const currentFolderChain = formattedResponse
              // eslint-disable-next-line guard-for-in, no-restricted-syntax
              for (const i in readableFolderChain.split('/')) {
                let newFolderID = 0
                if (readableFolderChain.split('/').length - 1 !== Number(i)) {
                  newFolderID = readableFolderChain
                    .split('/')
                    .slice(0, Number(i) + 1)
                    .join('/')
                } else {
                  newFolderID = readableFolderChain
                }
                folderChainArray.push({
                  id: newFolderID,
                  name: readableFolderChain.split('/')[i],
                  isDir: true,
                })
              }
              setFolderChain(
                folderChainArray.filter(
                  (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
                ),
              )
            },
            (error) => {
              console.log(error)
              toast(error.message, {
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              })
            },
          )
      } else {
        const compressToastId = toast.custom(
          (t) => (
            <Frame
              animate
              level={3}
              corners={3}
              layer="alert"
              style={{ background: '#000' }}
              show
            >
              <div className="frame-content">
                <Words>Compressing Files... </Words>
                <br />
                <Words>this could take a while</Words>
                <div id="dl-buttons" style={{}}>
                  <Button
                    layer="primary"
                    onClick={() => {
                      toast.dismiss(t.id)
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </Frame>
          ),
          {
            duration: Infinity,
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          },
        )
        fetch(currentPath.replace('CREATEZIP/', ''), {
          headers: { request: true },
        })
          .then((response) => response.json())
          .then(
            (response) => {
              if (response.status === 'COMPLETE') {
                toast.custom(
                  (t) => (
                    <Frame
                      animate
                      level={3}
                      corners={3}
                      layer="alert"
                      show
                      style={{ background: '#000' }}
                    >
                      <div className="frame-content">
                        <Words>
                          if a tab does not open,
                          <br /> the file is available for 4 hours below
                        </Words>
                        <div id="download-link" style={{ display: 'none' }}>
                          {response.link}
                        </div>
                        <input
                          id="clipboard"
                          style={{
                            position: 'fixed',
                            bottom: '0',
                            right: '0',
                            pointerEvents: 'none',
                            opacity: '0',
                            transform: 'scale(0)',
                          }}
                        />
                        <div id="dl-buttons" style={{}}>
                          <Button
                            layer="primary"
                            onClick={() => window.open(response.link, '_blank')}
                          >
                            Download
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            layer="primary"
                            onClick={() => {
                              const downloadLink =
                                document.getElementById('download-link')
                              const clipboard =
                                document.getElementById('clipboard')
                              clipboard.value = downloadLink.innerHTML
                              clipboard.select()
                              document.execCommand('copy')
                            }}
                          >
                            Copy URL
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            layer="primary"
                            onClick={() => {
                              toast.dismiss(t.id)
                            }}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </Frame>
                  ),
                  {
                    id: compressToastId,
                    duration: 60000,
                  },
                )
                window.open(response.link, '_blank')
              } else {
                toast.error(`Error Compressing Files/Folders see console`, {
                  id: compressToastId,
                })
                console.error(response.msg)
              }
            },
            (error) => {
              console.log(error)
              toast.error(error.message, {
                id: compressToastId,
              })
            },
          )
      }
    }
    getData()
  }, [currentPath, location])
  // Chonky file browser docs: https://timbokz.github.io/Chonky/
  return (
    <FileBrowser
      files={currentNodes}
      folderChain={folderChain}
      onFileAction={handleFileOpen}
      fileActions={[ChonkyActions.DownloadFiles]}
      disableDragAndDrop
      darkMode
      // view={FileView.SmallThumbs}
    >
      <FileNavbar />
      <FileToolbar />
      <FileList />
      <FileContextMenu />
      <ControlledPopup
        setPopupFile={props.setPopupFile}
        setShowPopup={props.setShowPopup}
        upPage={props.upPage}
        downPage={props.downPage}
        state={props.state}
        theme={props.theme}
      />
    </FileBrowser>
  )
}

export default ChonkyBrowse
