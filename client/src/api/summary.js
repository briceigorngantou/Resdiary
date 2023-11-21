import axios from "axios";
import BASE_URL from "../config/constant";

const getSummaryApi = async (micrositeName) => {
  const numberOfReviews = 5;
  try {
    let result = await axios
      .get(
        `${BASE_URL}/resdiary/summary?micrositeName=${micrositeName}&numberOfReviews=${numberOfReviews}`
      )
      .then((res) => {
        return res?.data;
      });
    return result;
  } catch (error) {
    return error;
  }
};
export default getSummaryApi;
