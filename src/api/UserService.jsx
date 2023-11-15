import ENPOINTS from "../constants/ENDPOINTS";

const UserService = {
  async authenticate(jwtRequest) {
    return await fetch(ENDPOINTS.AUTHENTICATE, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jwtRequest),
    }).then(async (response) => {
      const jwtToken = await response.json();
      return jwtToken;
    });
  },
};
