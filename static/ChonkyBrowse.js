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

const print2aApiHost = "localhost";
const print2aApiPort = "5757";
const print2aApiEndpoint = `http://${print2aApiHost}:${print2aApiPort}`;

// Render the file browser
const ChonkyBrowse = () => {
  const [currentNodes, setCurrentNodes] = useState([]);
  const [currentPath, setCurrentPath] = useState(print2aApiEndpoint+"/print2a");
  const [folderChain, setFolderChain] = useState([
    {
      id: "/",
      name: "/",
      isDir: true
    }
  ]);

  // Define a handler for "open file" action
  const handleFileOpen = node => {
    if (node.id == "mouse_click_file" && node.payload.clickType == "double") {
        console.log(node.payload)
        let folder = node.payload.file
      if (folder.isDir) {
        setCurrentPath(`${currentPath}/${folder.name}`);
      } else {
        setCurrentPath(`${currentPath}${folder.path}${folder.name}`);
        new Noty({
          text: `Sending file: ${print2aApiEndpoint}/print2a/${folder.name}`,
          type: "notification",
          theme: "relax",
          timeout: 3000
        }).show();
      }
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
            const formattedResponse = formatApiResponse(response);
            setCurrentNodes(formattedResponse);
            let testFolderChain = currentPath.replace(print2aApiEndpoint,"").substring(1).split("/");
            console.log(testFolderChain)
            setFolderChain([
              {
                id: currentPath,
                name: testFolderChain.pop(),
                isDir: true
              }
            ]);
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
