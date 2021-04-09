import React, { useEffect, useState } from "react";

const print2aApiHost = "https://print2a.com";
const print2aApiPort = "5757";
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`;

const GetLatest = () => {
  if (typeof window !== "undefined"){
    let response = fetch(`${print2aApiEndpoint}/LatestProjects`).then(response => {
      return response.json();
    }).then(response => {
      return response.map((file, index) => (
        <Post
          key={index}
          audio={{ silent: index > 4 }}
          data={{ ...file, id: "file" + index }}
        />
      ))
    })
  }
};

export default GetLatest;
