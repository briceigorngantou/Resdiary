import axios from "axios";
import BASE_URL from "../config/constant";

const getPromotionById = async (micrositeName, promotion) => {
  try {
    let result = await axios
      .get(
        `${BASE_URL}/resdiary/promotions-by-id?promotionId=${Number(
          promotion
        )}&micrositeName=${micrositeName}`
      )
      .then((res) => {
        return res?.data;
      });
    return result;
  } catch (error) {
    return error;
  }
};
export default getPromotionById;
