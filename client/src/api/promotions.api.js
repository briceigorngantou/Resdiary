import axios from "axios";
import BASE_URL from "../config/constant";

const getPromotions = async (micrositeName) => {
  const startDate = new Date();
  const endDate = "2025-06-01";
  try {
    let result = await axios
      .get(
        `${BASE_URL}/resdiary/all-promotions?micrositeName=${micrositeName}&startDate=${startDate.toLocaleDateString()}&endDate=${endDate}`
      )
      .then((res) => {
        return res?.data;
      });
    return result;
  } catch (error) {
    return error;
  }
};
export default getPromotions;
