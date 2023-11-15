let BASE_URL = "http://localhost:7171";
switch (process.env.NODE_ENV) {
  case "development":
    BASE_URL = "http://localhost:7171";
    break;

  default:
    break;
}

const USER_ENDPOINTS = {
  AUTHENTICATE: "authenticate",
};

const ENDPOINTS = {
  //USER
  AUTHENTICATE: "${BASE_URL}/${USER_ENDPOINTS.AUTHENTICATE}",
};

export default ENPOINTS;
