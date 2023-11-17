import { USER_ENDPOINTS } from "..constants/USER_ENDPOINTS";
const UserService = {
  async authenticate(jwtRequest) {
    return await fetch(USER_ENDPOINTS.AUTHENTICATE, {
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

  async getUserWithSector(userId) {
    return await fetch("${USER_ENDPOINTS.GET_USER_WITH_SECTOR}/${userId}", {
      method: "GET",
    }).then(async (response) => {
      const responseTemplateVO = await response.json();
      return responseTemplateVO;
    });
  },

  async getUser(userId) {
    return await fetch("${USER_ENDPOINTS.GET_USER}/${userId}", {
      method: "GET",
    }).then(async (response) => {
      const user = await response.json();
      return user;
    });
  },

  async getUserByUsername(username) {
    const requestParams = new URLSearchParams({
      username: username,
    });
    return await fetch(
      "${USER_ENDPOINTS.GET_USER_BY_USERNAME}?${requestParams}",
      {
        method: "GET",
      }
    ).then(async (response) => {
      const user = await response.json();
      return user;
    });
  },

  async setWorkVisibleForUser(userId, visible) {
    const requestParams = new URLSearchParams({
      visible: visible,
    });
    return await fetch(
      "${USER_ENDPOINTS.SET_WORK_VISIBLE_FOR_USER}/${userId}?${requestParams}",
      {
        method: "PUT",
      }
    ).then(async (response) => {
      const user = await response.json();
      return user;
    });
  },

  async getAllUsers() {
    return await fetch("${USER_ENDPOINTS.GET_ALL_USERS}", {
      method: "GET",
    }).then(async (response) => {
      const users = await response.json();
      return users;
    });
  },

  async getAllUsersInSector(sectorId) {
    return await fetch(
      "${USER_ENDPOINTS.GET_ALL_USERS_IN_SECTOR}/${sectorId}",
      {
        method: "GET",
      }
    ).then(async (response) => {
      const usersInSector = await response.json();
      return usersInSector;
    });
  },

  async getAllUsersInCompany(companyId) {
    return await fetch(
      "${USER_ENDPOINTS.GET_ALL_USERS_IN_COMPANY}/${companyId}",
      {
        method: "GET",
      }
    ).then(async (response) => {
      const usersInCompany = await response.json();
      return usersInCompany;
    });
  },

  async saveUser(newUser) {
    return await fetch("${USER_ENDPOINTS.SAVE_USER}", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(async (response) => {
      const user = await response.json();
      return user;
    });
  },
};
export default UserService;
