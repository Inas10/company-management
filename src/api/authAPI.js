import axiosInstance from "./axiosInstance";

export const handleLogin = async (data) => {
  return axiosInstance
    .get(`/me`, {
      headers: {
        Authorization: `Bearer ${data.tokenId}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
