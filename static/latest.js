const print2aApiHost = "https://print2a.com";
const print2aApiPort = "5757";
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`;

let response = await fetch(`${print2aApiEndpoint}/LatestProjects`);
let projects = await response.json;
return projects;
