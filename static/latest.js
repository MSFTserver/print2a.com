import React, { useEffect, useState } from 'react';
import { Post } from '../src/components/Post';

const print2aApiHost = "https://print2a.com";
const print2aApiPort = "5757";
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`;

const GetLatest = () => {
  const [latest, setLatest] = useState([{title: "LOADING...", tags: "LOADING...", link: "#"}]);
  useEffect(() => {
    if (typeof window !== "undefined"){
      async function getLatest(){
        const req = await fetch(`${print2aApiEndpoint}/LatestProjects`);
        console.log(req)
        const res = await req.json();
        console.log(res)
        setLatest(res);
      }
      getLatest();
    }
  }, [latest])
  return (
    latest.map((file, index) => (
    <Post
      key={index}
      audio={{ silent: index > 4 }}
      data={{ ...file, id: 'file' + index }}
    />
    ))
  )
};
export default GetLatest;
