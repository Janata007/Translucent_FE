import { SECTOR_ENDPOINTS } from "../constants/ENDPOINTS";

const SectorService = {
  async authenticate(jwtRequest) {
    return await fetch(SECTOR_ENDPOINTS.AUTHENTICATE, {
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

  async saveSector(token, sector) {
    console.log(sector);
    return await fetch(SECTOR_ENDPOINTS.SAVE_SECTOR, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Beaerer ${token}`,
      },
      body: JSON.stringify(sector),
    }).then(async (response) => {
      const sector = await response.json();
      return sector;
    });
  },

  async findById(token, id) {
    return await fetch(`${SECTOR_ENDPOINTS.FIND_BY_ID}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const sector = await response.json();
      return sector;
    });
  },
  async getAllSectors(token) {
    return await fetch(`${SECTOR_ENDPOINTS.GET_ALL_SECTORS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const sectors = await response.json();
      return sectors;
    });
  },

  async getOfferedServicesForSector(token, id) {
    return await (`${SECTOR_ENDPOINTS.GET_OFFERED_SERVICES_FOR_SECTOR}/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const offeredServices = await response.json();
      return offeredServices;
    });
  },
};
export default SectorService;
