import axiosInstance from "./axiosInstance";
export const fetchCompanies = async (token, page, size = 5) => {
  return await axiosInstance
    .get(`/companies?PageIndex=${page}&PageSize=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const addCompany = async (companyName, token) => {
  return await axiosInstance
    .post(
      `/companies`,
      { companyName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const editCompany = async (companyName, companyId, token) => {
  return await axiosInstance
    .put(
      `/companies/${companyId}`,
      { companyName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const deleteCompany = async (companyId, token) => {
  return await axiosInstance
    .delete(`/companies/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};
