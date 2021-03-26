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

const print2aApiHost = "beta.print2a.com";
const print2aApiPort = "5757";
const print2aApiEndpoint = `http://${print2aApiHost}:${print2aApiPort}`;

// Render the file browser
const ChonkyBrowse = () => {
  const [currentNodes, setCurrentNodes] = useState([]);
  const [currentPath, setCurrentPath] = useState(print2aApiEndpoint+"/print2a");
  const [folderChain, setFolderChain] = useState([
    {
      id:"print2a",
      name:"print2a",
      mode:"0777",
      size:4096,
      sizeHuman:"4 KB",
      username:65534,
      isDir:true,
      birthtime:"2021-01-23T00:16:28.872Z",
      mtime:"2021-03-18T04:22:12.981Z",
      childrenCount:12,
      path:"../../repo/"
    }
  ]);

  // Define a handler for "open file" action
  const handleFileOpen = node => {
    if (node.id == "open_files" && node.payload.files[0].isDir) {
        let folder = node.payload.files[0]
        console.log(node)
        console.log(node.payload.files)
        console.log(`${print2aApiEndpoint}/${folder.id}`)
        setCurrentPath(`${print2aApiEndpoint}/${folder.id}`);
      } else if (node.id == "open_files" && !node.payload.files[0].isDir) {
        let folder = node.payload.files[0].id
        setCurrentPath(`${print2aApiEndpoint}${folder.path}${folder.id}`);
        new Noty({
          text: `Sending file: ${print2aApiEndpoint}/print2a/${folder.name}`,
          type: "notification",
          theme: "relax",
          timeout: 3000
        }).show();
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
      fetch(currentPath)
        .then(response => {
          return response.json();
        })
        .then(
          response => {
            let folderChainArray = [];
            const formattedResponse = formatApiResponse(response);
            //console.log(folderChain)
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
            setFolderChain(folderChainArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i));
            console.log("FOLDER CHAIN: ",folderChainArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i))
          },
          error => {
            console.log(error);
            new Noty({
              text: error.message,
              type: "error",
              theme: "relax",
              timeout: 3000
            }).show();
          }
        );
    };
    getData();
  }, [currentPath]);

  // Chonky file browser docs: https://timbokz.github.io/Chonky/
  return (
    <FileBrowser
      files={currentNodes}
      folderChain={folderChain}
      onFileAction={handleFileOpen}
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
