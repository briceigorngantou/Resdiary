import axios from "axios";
import BASE_URL from "../config/constant";

const bookingApi = async (
  visitDate,
  visitTime,
  partySize,
  firstName,
  surName,
  email,
  phone,
  phoneCountryCode,
  specialRequests,
  ReceiveSmsMarketing,
  ReceiveEmailMarketing,
  ReceiveRestaurantSmsMarketing,
  ReceiveRestaurantEmailMarketing,
  promotion,
  micrositeName
) => {
  const body = {
    VisitDate: visitDate,
    VisitTime: visitTime,
    ChannelCode: "ONLINE",
    SpecialRequests: specialRequests,
    PartySize: Number(partySize),
    FirstName: firstName,
    Email: email,
    Surname: surName,
    PhoneCountryCode: phoneCountryCode,
    Phone: phone,
    ReceiveSmsMarketing: ReceiveSmsMarketing,
    ReceiveEmailMarketing: ReceiveEmailMarketing,
    ReceiveRestaurantSmsMarketing: ReceiveRestaurantSmsMarketing,
    ReceiveRestaurantEmailMarketing: ReceiveRestaurantEmailMarketing,
  };
  let uri;
  if (promotion) {
    uri = `${BASE_URL}/resdiary/booking-available-promotion?promotionId=${Number(
      promotion
    )}&micrositeName=${micrositeName}`;
  } else {
    uri = `${BASE_URL}/resdiary/booking?micrositeName=${micrositeName}`;
  }
  console.log(body)
  try {
    let bookSaved = await axios.post(uri, body).then((res) => {
      return res?.data;
    });
    return bookSaved;
  } catch (error) {
    return error;
  }
};
export default bookingApi;
