const print2aApiHost = "https://print2a.com";
const print2aApiPort = "5757";
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`;

// Render the file browser
const GetLatest = async () => {
  let response = await fetch(`${print2aApiEndpoint}/LatestProjects`);
  response = await response.json;
  return response;
};

export default GetLatest;
