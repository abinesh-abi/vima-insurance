import axios from "axios";
import CONFIG from "../config";

export const axiosInstance = axios.create({
  baseURL: CONFIG.SERVER_URL,
});

export const getPolicies = async (query: string = "") => {
  try {
    const response: Axios.AxiosXHR<any> = await axiosInstance.get(
      `/policies/list/${query}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
