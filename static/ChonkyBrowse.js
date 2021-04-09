// Import React as usual
import React, { useEffect, useState } from "react";

// Import Noty for nice file open notifications
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/relax.css";

// Import Chonky
import { FullFileBrowser,
          setChonkyDefaults,
          FileBrowser,
          FileContextMenu,
          FileList,
          FileNavbar,
          FileToolbar,
          ChonkyActions,
          FileView
        } from "chonky";
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
setChonkyDefaults({ iconComponent: ChonkyIconFA });

const print2aApiHost = "https://print2a.com";
const print2aApiPort = "5757";
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`;

// Render the file browser
const ChonkyBrowse = () => {
  let newPath = print2aApiEndpoint+"/print2a";
  let newChain = {
    id:"print2a",
    name:"print2a",
    isDir:true
  }
  if (typeof window !== "undefined"){
    if (window.location.search){
      const urlParams = new URLSearchParams(window.location.search);
      newPath = `${print2aApiEndpoint}/print2a/${urlParams.get('folder')}`;
    }
  }
  const [currentNodes, setCurrentNodes] = useState([]);
  const [currentPath, setCurrentPath] = useState(newPath);
  const [folderChain, setFolderChain] = useState([newChain]);
  // Define a handler for "open file" action
  const handleFileOpen = async node => {
    if (node.id == "open_files" && node.payload.files[0].isDir) {
        let folder = node.payload.files[0]
        setCurrentPath(`${print2aApiEndpoint}/${folder.id}`);
      } else if (node.id == "open_files" && !node.payload.files[0].isDir) {
        let folder = node.payload.files[0];
        new Noty({
          text: `Sending file:<br> ${print2aApiEndpoint}/${folder.id}`,
          type: "notification",
          theme: "relax",
          timeout: 10000
        }).show();
        window.open(`${print2aApiEndpoint}/${folder.id}`, "_blank")
      } else if (node.id == "download_files" && node.state.selectedFiles[0].isDir) {
        let folder = node.state.selectedFiles[0];
        new Noty({
          text: `Getting Compressed Files/Folders:<br> ${folder.id.replace(/\//g,"+")}<br><br>Please be patient and remain on the browse page`,
          type: "notification",
          theme: "relax",
          timeout: 10000
        }).on('afterShow', function() {

        }).show();
        setCurrentPath(`CREATEZIP/${print2aApiEndpoint}/${folder.id}`);
        setCurrentPath(`${print2aApiEndpoint}/${folder.id.split("/").slice(0,folder.id.split("/").length - 1).join("/")}`)
      } else if (node.id == "download_files" && !node.state.selectedFiles[0].isDir) {
        let folder = node.state.selectedFiles[0]
        new Noty({
          text: `Sending file: ${print2aApiEndpoint}/${folder.id}`,
          type: "notification",
          theme: "relax",
          timeout: 10000
        }).show();
        window.open(`${print2aApiEndpoint}/${folder.id}`, "_blank")
      }
  };

  const formatApiResponse = apiResponse =>
    apiResponse.map(node => {
      return {
        id: node.id,
        name: node.name,
        isDir: node.isDir,
        path: node.path,
        size: node.size,
        childrenCount: node.childrenCount,
        modDate: new Date(node.mtime)
      };
    });

  useEffect(() => {
    const getData = async () => {
      if (!currentPath.startsWith("CREATEZIP")) {
        fetch(currentPath)
        .then(response => {
          return response.json();
        })
        .then(
          response => {
            let folderChainArray = [];
            const formattedResponse = formatApiResponse(response);
            setCurrentNodes(formattedResponse);
            let readableFolderChain = currentPath.replace(print2aApiEndpoint,"").substring(1);
            let currentFolderChain = formattedResponse
            for (let i in readableFolderChain.split("/")){
              let newFolderID = 0;
              if(readableFolderChain.split("/").length-1 !== Number(i)){
                newFolderID = readableFolderChain.split("/").slice(0,Number(i)+1).join("/")
              } else {
                newFolderID = readableFolderChain
              }
              folderChainArray.push({
                id: newFolderID,
                name: readableFolderChain.split("/")[i],
                isDir: true
              })
            }
            window.history.pushState('NewPage', 'Title', `/browse?folder=${currentPath.replace(print2aApiEndpoint,"").replace("/print2a/","").replace("/print2a","")}`);
            setFolderChain(folderChainArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i));
          },
          error => {
            console.log(error);
            new Noty({
              text: error.message,
              type: "error",
              theme: "relax",
              timeout: 10000
            }).show();
          }
        );
      } else {
        fetch(currentPath.replace("CREATEZIP/",""),{headers: {'request': true}})
        .then(response => {
          return response.json();
        })
        .then(
          response => {
            if (response.status == "COMPLETE"){
              new Noty({
                text: `Completed<br>if a window does not automatically open you can find the file available for 4 hours here:<br><br> ${response.link}`,
                type: "notification",
                theme: "relax",
                timeout: 10000
              }).show();
              window.open(`${response.link}`, "_blank");
            } else {
              new Noty({
                text: `Error Compressing Files/Folders see console`,
                type: "error",
                theme: "relax",
                timeout: 10000
              }).show();
              console.error(response.msg)
            }
          },
          error => {
            console.log(error);
            new Noty({
              text: error.message,
              type: "error",
              theme: "relax",
              timeout: 10000
            }).show();
          }
        )
      }
    };
    getData();
  }, [currentPath]);

  // Chonky file browser docs: https://timbokz.github.io/Chonky/
  return (
    <FileBrowser
      files={currentNodes}
      folderChain={folderChain}
      onFileAction={handleFileOpen}
      fileActions={[
        ChonkyActions.DownloadFiles
      ]}
      disableDragAndDrop={true}
      darkMode={true}
      //view={FileView.SmallThumbs}
    >
      <FileNavbar />
      <FileToolbar />
      <FileList />
      <FileContextMenu />
    </FileBrowser>
  );
};

export default ChonkyBrowse;
