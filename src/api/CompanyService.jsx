import { COMPANY_ENDPOINTS, SECTOR_ENDPOINTS } from "../constants/ENDPOINTS";

const CompanyService = {
  async saveNewCompany(token, company) {
    return await fetch(COMPANY_ENDPOINTS.SAVE_NEW_COMPANY, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(company),
    }).then(async (response) => {
      const company = await response.json();
      return company;
    });
  },

  async findCompanyById(token, id) {
    return await fetch(`${COMPANY_ENDPOINTS.FIND_COMPANY_BY_ID}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const company = response.json();
      return company;
    });
  },

  async deleteCompanyById(token, id) {
    return await fetch(`${COMPANY_ENDPOINTS.DELETE_COMPANY_BY_ID}/${id}/delete`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const company = await response.json();
      return company;
    });
  },

  async addSectorToCompany(token, companyId, sectorId) {
    return await fetch(
      `${COMPANY_ENDPOINTS.ADD_SECTOR_TO_COMPANY}/${companyId}/addSector/${sectorId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const company = await response.json();
      return company;
    });
  },

  async deleteSectorFromCompany(token, companyId, sectorId) {
    return await fetch(
      `${COMPANY_ENDPOINTS.DELETE_SECTOR_FROM_COMPANY}/${companyId}/removeSector/${sectorId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const company = await response.json();
      return company;
    });
  },
  async deleteSector(token, sectorId){
    return await fetch(
      `${SECTOR_ENDPOINTS.DELETE_SECTOR}/${sectorId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const sector = await response.json();
      return sector;
    });
  },

  async getOfferedServicesForCompany(token, id) {
    return await fetch(
      `${COMPANY_ENDPOINTS.GET_OFFERED_SERVICES_FOR_COMPANY}/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const offeredServices = await response.json();
      return offeredServices;
    });
  },

  async getAllCompanies(token) {
    return await fetch(`${COMPANY_ENDPOINTS.GET_ALL_COMPANIES}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const companies = await response.json();
      return companies;
    });
  },

  async getCompaniesForNeededServices(token, serviceNeeded) {
    const requestParams = new URLSearchParams({
      serviceNeeded: serviceNeeded,
    });
    return await fetch(
      `${COMPANY_ENDPOINTS.GET_COMPANIES_FOR_NEEDED_SERVICE}?${requestParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const companies = await response.json();
      return companies;
    });
  },
};
export default CompanyService;
