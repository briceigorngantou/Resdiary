import axios from "axios";
import BASE_URL from "../config/constant";

const getSettingsApi = async (micrositeName) => {
  try {
    let result = await axios
      .get(`${BASE_URL}/resdiary/settings?micrositeName=${micrositeName}`)
      .then((res) => {
        return res?.data;
      });
    return result;
  } catch (error) {
    return error;
  }
};
export default getSettingsApi;
