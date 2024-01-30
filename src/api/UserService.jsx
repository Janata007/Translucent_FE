import { USER_ENDPOINTS } from "../constants/ENDPOINTS";
import { SUCCESSFUL_LOGIN_RESPONSE } from "../constants/mocks/MOCK_RESPONSES";

const UserService = {
  async authenticate(jwtRequest) {
    return await fetch(USER_ENDPOINTS.AUTHENTICATE, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jwtRequest),
    })
      .then(async (response) => {
        const jwtToken = await response.json();
        return jwtToken;
      }) //todo: change for actual impl
      .catch((err) => {
        return SUCCESSFUL_LOGIN_RESPONSE;
      });
  },

  async getUserWithSector(userId, token) {
    return await fetch(`${USER_ENDPOINTS.GET_USER_WITH_SECTOR}/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const responseTemplateVO = await response.json();
      return responseTemplateVO;
    });
  },

  async getUser(userId, token) {
    return await fetch(`${USER_ENDPOINTS.GET_USER}/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const user = await response.json();
      return user;
    });
  },

  async getUserByUsername(username, token) {
    const requestParams = new URLSearchParams({
      username: username,
    });
    return await fetch(
      `${USER_ENDPOINTS.GET_USER_BY_USERNAME}?${requestParams}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const user = await response.json();
      return user;
    });
  },

  async setWorkVisibleForUser(userId, visible, token) {
    const requestParams = new URLSearchParams({
      visible: visible,
    });
    return await fetch(
      `${USER_ENDPOINTS.SET_WORK_VISIBLE_FOR_USER}/${userId}?${requestParams}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const user = await response.json();
      return user;
    });
  },

  async getAllUsers(token) {
    return await fetch(`${USER_ENDPOINTS.GET_ALL_USERS}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const users = await response.json();
      return users;
    });
  },

  async getAllUsersInSector(sectorId, token) {
    return await fetch(
      `${USER_ENDPOINTS.GET_ALL_USERS_IN_SECTOR}/${sectorId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const usersInSector = await response.json();
      return usersInSector;
    });
  },

  async getAllUsersInCompany(companyId, token) {
    return await fetch(
      `${USER_ENDPOINTS.GET_ALL_USERS_IN_COMPANY}/${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const usersInCompany = await response.json();
      return usersInCompany;
    });
  },

  async saveUser(newUser) {
    console.log("Endpoint pinged: " + USER_ENDPOINTS.SAVE_USER);
    return await fetch(`${USER_ENDPOINTS.SAVE_USER}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(async (response) => {
      const r = await response.clone();
      const responseText = await response.text();
      if (responseText == "") {
        //todo: insert existing user modal
        return null;
      } else {
        const user = r.json();
        return user;
      }
    });
  },
};
export default UserService;
