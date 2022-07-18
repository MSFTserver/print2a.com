import React, { useState } from 'react'
import Markdown from 'marked-react'
import { Button, Frame, Words } from 'arwes'
import Popup from 'reactjs-popup'
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5'
import './ControlledPopup.scss'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

// eslint-disable-next-line react/prefer-stateless-function
function TextPopup(props) {
  const { setShowPopup, upPage, downPage, state, theme } = props
  const { popupFile, showPopup, pdfPage } = state
  const [numPages, setNumPages] = useState(null)
  const contentStyle = {
    background: 'none',
    color: theme.color.primary.base,
    border: 'none',
    display: 'block',
    overflow: 'hidden',
  }
  const overlayStyle = {
    background: 'rgba(0,0,0,0.5)',
  }
  // eslint-disable-next-line no-shadow
  function onPDFLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  let fileToRender
  let pdfButtons
  if (popupFile.ext.toLowerCase() === 'md') {
    fileToRender = (
      <div className="textContainer">
        <Markdown value={popupFile.data} gfm />
      </div>
    )
  } else if (popupFile.ext.toLowerCase() === 'txt') {
    fileToRender = <div className="textContainer">{popupFile.data}</div>
  } else {
    fileToRender = (
      <Document
        file={`data:application/pdf;base64,${popupFile.data}`}
        // eslint-disable-next-line react/jsx-no-bind
        onLoadSuccess={onPDFLoadSuccess}
      >
        <Page canvasBackground="transparent" pageNumber={pdfPage} />
      </Document>
    )
    pdfButtons = (
      <>
        <Button
          style={{ padding: '1vh' }}
          disabled={pdfPage === 1}
          type="button"
          className="backwards"
          onClick={downPage}
        >
          <i className="fa-solid fa-gun fa-flip-horizontal"></i>
        </Button>
        <Words>
          Pg.{pdfPage}/{numPages}
        </Words>
        <Button
          style={{ padding: '1vh' }}
          type="button"
          className="forwards"
          onClick={upPage}
          disabled={numPages <= 1 || numPages === pdfPage}
        >
          <i className="fa-solid fa-gun"></i>
        </Button>
      </>
    )
  }
  return (
    <Popup
      open={showPopup}
      closeOnDocumentClick={false}
      {...{ overlayStyle, contentStyle }}
    >
      <Frame
        animate
        level={3}
        corners={6}
        layer="primary"
        show
        noBackground
        theme={theme}
        style={{
          backgroundColor: theme.background.primary.level0,
        }}
      >
        <div className="textButtons">
          <div className="exit-and-dl">
            <Button
              style={{ padding: '1vh' }}
              type="button"
              className="close"
              onClick={setShowPopup}
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
            <Button
              style={{ padding: '1vh' }}
              type="button"
              className="download"
              onClick={() =>
                window.open(
                  `https://api.print2a.com/${popupFile.path}`,
                  '_blank',
                )
              }
            >
              <i className="fa-solid fa-circle-arrow-down"></i>
            </Button>
          </div>
          <div className="pdfButtons">{pdfButtons}</div>
        </div>
        <div className="popupContents">{fileToRender}</div>
      </Frame>
    </Popup>
  )
}

export default TextPopup
