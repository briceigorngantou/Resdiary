import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { lastValueFrom, map } from "rxjs";
import { HttpService } from "@nestjs/axios";
import * as dotenv from "dotenv";
import { AxiosRequestConfig } from "axios";
import { StandardBookingDto } from "./dto/standardBooking.dto";
import { SearchAvailabilityDto } from "./dto/searchAvailability.dto";
import { SearchAvailabilityForDateRangeDto } from "./dto/searchAvailabilityForDateRange.dto";
import { responseException } from "src/shared/responseBody";

dotenv.config();

@Injectable()
export class ResdiaryService {
  logger: Logger;

  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger();
  }

  // get token authentication
  async getAuthFromResdiary() {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const ResdiaryAuth = {
      userName: process.env.USERNAME_RESDIARY_API,
      password: process.env.PASSWORD_RESDIARY_API,
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .post(process.env.RESDIARY_AUTH_PATH, ResdiaryAuth, requestConfig)
          .pipe(
            map((response) => {
              return response.data;
            })
          )
      );
      return responseData;
    } catch (e) {
      return responseException(e);
    }
  }

  // get Current user infos
  async getCurrentUserInfo() {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .get(process.env.RESDIARY_GET_CURRENT_USER_PATH, requestConfig)
          .pipe(
            map((response) => {
              return response.data;
            })
          )
      );
      return responseData;
    } catch (e) {
      return responseException(e);
    }
  }

  // get Details of specific restaurant
  async getRestaurantByMicrositeName(micrositeName: string) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            `${process.env.RESDIARY_GET_RESTAURANT_PATH}/${micrositeName}`,
            requestConfig
          )
          .pipe(
            map((response) => {
              return response.data;
            })
          )
      );
      if (responseData) return responseData;
      else return null;
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }

  async getAllRestaurantsName() {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            process.env.RESDIARY_GET_RESTAURANTS_MICROSITE_NAME_PATH,
            requestConfig
          )
          .pipe(
            map((response) => {
              return response.data;
            })
          )
      );
      if (responseData) {
        return responseData;
      } else return null;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // get All restaurants
  async getAllRestaurants() {
    const arrayRestaurantName = await this.getAllRestaurantsName();
    try {
      const arrayResult = [];

      for (let i = 0; i < arrayRestaurantName.length; i++) {
        const res = await this.getRestaurantByMicrositeName(
          arrayRestaurantName[i]
        );
        arrayResult.push(res);
      }
      this.logger.log("all restaurants:", arrayResult);
      return arrayResult;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // getAvailability Search
  async getAvailabilitySearch(
    micrositeName: string,
    data: SearchAvailabilityDto
  ) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    const finalObject = {
      VisitDate: data.VisitDate,
      searchParameters: {},
      PartySize: data.PartySize,
      ChannelCode: data.ChannelCode,
      AvailabilityType: data.AvailabilityType,
    };
    const path = `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${micrositeName}/AvailabilitySearch/`;
    try {
      const responseData = await lastValueFrom(
        this.httpService.post(path, finalObject, requestConfig).pipe(
          map((response) => {
            return response.data;
          })
        )
      );
      return responseData;
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }

  // getAvailability Search for date range
  async getAvailabilityForDateRange(
    micrositeName: string,
    data: SearchAvailabilityForDateRangeDto
  ) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    const finalObject = {
      DateTo: data.DateTo,
      searchParameters: {},
      DateFrom: data.DateFrom,
      PartySize: data.PartySize,
      ChannelCode: data.ChannelCode,
      AvailabilityType: data.AvailabilityType,
    };
    const path = `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${micrositeName}/AvailabilityForDateRangeV2/`;
    try {
      const responseData = await lastValueFrom(
        this.httpService.post(path, finalObject, requestConfig).pipe(
          map((response) => {
            return response.data;
          })
        )
      );
      return responseData;
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }

  // Make booking
  async makeStandardBookingInResDiary(
    data: StandardBookingDto,
    restaurantName: string
  ) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };

    const CustomerInfo = {
      Title: "Mr/Mme",
      FirstName: data.FirstName,
      Surname: data.Surname,
      MobileCountryCode: data.PhoneCountryCode,
      Mobile: data.Phone,
      PhoneCountryCode: data.PhoneCountryCode,
      Phone: data.Phone,
      Email: data.Email,
      ReceiveEmailMarketing: true,
      ReceiveSmsMarketing: true,
      GroupEmailMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      GroupSmsMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ReceiveRestaurantEmailMarketing: true,
      ReceiveRestaurantSmsMarketing: true,
      RestaurantEmailMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      RestaurantSmsMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };

    const finalObject = {
      VisitDate: data.VisitDate,
      VisitTime: data.VisitTime,
      ChannelCode: data.ChannelCode,
      PartySize: data.PartySize,
      Customer: CustomerInfo,
      RoomNumber: 15,
      SpecialRequests: data.SpecialRequests,
      IsLeaveTimeConfirmed: true,
    };

    const path = `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${restaurantName}/BookingWithStripeToken`;
    try {
      const responseData = await lastValueFrom(
        this.httpService.post(path, finalObject, requestConfig).pipe(
          map((response) => {
            return response.data;
          })
        )
      );
      return this.responseBooking(responseData);
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }

  async responseBooking(responseResdiary: any) {
    if (
      responseResdiary?.Status == "Success" &&
      (responseResdiary?.Booking?.BookingStatus == "Booked" ||
        responseResdiary?.Booking?.BookingStatus == "Confirmed")
    ) {
      return {
        status: 201,
        data: responseResdiary?.Booking,
        message: "Booking is confirmed on the diary",
      };
    } else {
      if (
        responseResdiary?.Status == "CreditCardRequired" ||
        responseResdiary?.Status == "PaymentRequired"
      ) {
        return {
          status: 201,
          data: responseResdiary?.Booking?.PaymentInformation,
          message:
            "A credit card token, or a payment is required in order to secure the booking.",
        };
      } else {
        if (responseResdiary?.Errors) {
          return Promise.reject(
            new BadRequestException(responseResdiary?.Errors)
          );
        } else {
          return Promise.reject(
            new ForbiddenException(responseResdiary?.Status)
          );
        }
      }
    }
  }

  // get All Promotions Available In Specific Restaurant
  async getAllPromotionsAvailableInSpecificRestaurant(restaurantName: string) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${restaurantName}/Promotion`,
            requestConfig
          )
          .pipe(
            map((response) => {
              return response.data;
            })
          )
      );
      if (responseData) return responseData;
      else return null;
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }

  // get Detail of specific promotion
  async getDetailOfSpecificPromotion(
    restaurantName: string,
    promotionId: number
  ) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${restaurantName}/Promotion?promotionIds=${promotionId}`,
            requestConfig
          )
          .pipe(
            map((response) => {
              return response.data;
            })
          )
      );
      if (responseData) return responseData;
      else return null;
    } catch (error) {
      this.logger.error(error);
      return responseException(error);
    }
  }

  // Make reservation with available and required promotion
  async makeStandardBookingWithAvailableAndRequiredPromotion(
    data: StandardBookingDto,
    promotionId: number,
    restaurantName: string
  ) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };

    const CustomerInfo = {
      Title: "Mr/Mme",
      FirstName: data.FirstName,
      Surname: data.Surname,
      MobileCountryCode: data.PhoneCountryCode,
      Mobile: data.Phone,
      PhoneCountryCode: data.PhoneCountryCode,
      Phone: data.Phone,
      Email: data.Email,
      ReceiveEmailMarketing: true,
      ReceiveSmsMarketing: true,
      GroupEmailMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      GroupSmsMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ReceiveRestaurantEmailMarketing: true,
      ReceiveRestaurantSmsMarketing: true,
      RestaurantEmailMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      RestaurantSmsMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };

    const finalObject = {
      VisitDate: data.VisitDate,
      VisitTime: data.VisitTime,
      ChannelCode: data.ChannelCode,
      PartySize: data.PartySize,
      PromotionId: promotionId,
      Customer: CustomerInfo,
      RoomNumber: 15,
      SpecialRequests: data.SpecialRequests,
      IsLeaveTimeConfirmed: true,
    };

    const path = `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${restaurantName}/BookingWithStripeToken`;
    try {
      const responseData = await lastValueFrom(
        this.httpService.post(path, finalObject, requestConfig).pipe(
          map((response) => {
            return response.data;
          })
        )
      );
      return this.responseBooking(responseData);
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }

  //
  async makeStandardReservationWithRequiredPayment(
    data: StandardBookingDto,
    DepositPaidAmount: number,
    restaurantName: string,
    promotionId: number
  ) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };

    const CustomerInfo = {
      Title: "Mr/Mme",
      FirstName: data.FirstName,
      Surname: data.Surname,
      MobileCountryCode: data.PhoneCountryCode,
      Mobile: data.Phone,
      PhoneCountryCode: data.PhoneCountryCode,
      Phone: data.Phone,
      Email: data.Email,
      ReceiveEmailMarketing: true,
      ReceiveSmsMarketing: true,
      GroupEmailMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      GroupSmsMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ReceiveRestaurantEmailMarketing: true,
      ReceiveRestaurantSmsMarketing: true,
      RestaurantEmailMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      RestaurantSmsMarketingOptInText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };

    const finalObject = {
      VisitDate: data.VisitDate,
      VisitTime: data.VisitTime,
      ChannelCode: data.ChannelCode,
      PartySize: data.PartySize,
      PromotionId: promotionId,
      DepositPaidAmount: DepositPaidAmount,
      Customer: CustomerInfo,
      RoomNumber: 15,
      SpecialRequests: data.SpecialRequests,
      IsLeaveTimeConfirmed: true,
    };

    const path = `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${restaurantName}/BookingWithStripeToken`;
    try {
      const responseData = await lastValueFrom(
        this.httpService.post(path, finalObject, requestConfig).pipe(
          map((response) => {
            return response.data;
          })
        )
      );
      return this.responseBooking(responseData);
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }

  // confirm Booking With stripeToken
  async confirmBookingWithStripeToken(
    stripeToken: string,
    referenceBooking: string,
    restaurantName: string
  ) {
    const token = await this.getAuthFromResdiary();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer " + `${token.Token}`,
        "Content-Type": "application/json",
      },
    };
    const path = `https://api.rdbranch.com//api/ConsumerApi/v1/Restaurant/${restaurantName}/Booking/${referenceBooking}/Confirm?stripeToken=${stripeToken}`;
    try {
      const responseData = await lastValueFrom(
        this.httpService.post(path, null, requestConfig).pipe(
          map((response) => {
            return response.data;
          })
        )
      );
      return responseData;
    } catch (e) {
      this.logger.error(e);
      return responseException(e);
    }
  }
}
