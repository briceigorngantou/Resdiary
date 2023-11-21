import axios from "axios";
import BASE_URL from "../config/constant";

const searchAvailabilityApi = async (dateFrom, partySize, micrositeName) => {
  const body = {
    DateFrom: dateFrom,
    DateTo: dateFrom,
    PartySize: partySize,
    ChannelCode: "ONLINE",
    AvailabilityType: "Reservation",
  };
  let uri;
  uri = `${BASE_URL}/resdiary/search-availability-for-date-range?micrositeName=${micrositeName}`;

  try {
    let resultSearch = await axios.post(uri, body).then((res) => {
      return res?.data;
    });
    return resultSearch;
  } catch (error) {
    return error;
  }
};
export default searchAvailabilityApi;
