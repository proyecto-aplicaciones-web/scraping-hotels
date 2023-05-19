import axios from "axios";
import CONFIG from "config";

// interface getAxiosHeadersProps {
//   token?: string;
// }

const instance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
});

// export const getAxiosHeaders = ({ token }: getAxiosHeadersProps) => {
//   return token ? { Authorization: `Bearer ${token}` } : null;
// };

export default instance;