import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import { ResponseBody } from "src/shared/responseBody";
import { ResdiaryService } from "./resdiary.service";
import { StandardBookingDto } from "./dto/standardBooking.dto";
import { SearchAvailabilityForDateRangeDto } from "./dto/searchAvailabilityForDateRange.dto";

@Controller("resdiary")
@ApiTags("resdiary")
export class ResdiaryController {
  constructor(private readonly resDiaryService: ResdiaryService) {}

  @ApiTags("resdiary")
  @Get("/all-restaurants")
  @ApiOperation({
    summary: "All our restaurants available in the diary",
    description:
      "Here we list all the restaurants available on our Resdiary account. This is the first step in our reservation process.",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  async getRestaurants() {
    const result = await this.resDiaryService.getAllRestaurants();
    return new ResponseBody(result, null);
  }

  @ApiTags("resdiary")
  @Get("/restaurant-by-micrositeName")
  @ApiOperation({
    summary: "Current restaurant on Resdiary",
    description:
      "The second step here is to view the details of a restaurant including the menu, location, etc.",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  async getRestaurantByName(@Query("micrositeName") micrositeName: string) {
    const result = await this.resDiaryService.getRestaurantByMicrositeName(
      micrositeName
    );
    return new ResponseBody(result, null);
  }

  @ApiTags("resdiary")
  @Post("/search-availability-for-date-range")
  @ApiOperation({
    summary: "Search restaurants available for date range on diary",
    description:
      "At this level it is a matter of searching for availability in one of the restaurants listed above in order to make reservations more easily.",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  @ApiBody({ type: SearchAvailabilityForDateRangeDto })
  async getAvailabilityRestaurantsForDateRange(
    @Body() data,
    @Query("micrositeName") micrositeName: string
  ) {
    const result = await this.resDiaryService.getAvailabilityForDateRange(
      micrositeName,
      data
    );
    return new ResponseBody(result, null);
  }

  @ApiTags("resdiary")
  @Post("/booking")
  @ApiOperation({
    summary: "Standard booking in one of our restaurants",
    description:
      "We can now make a standard reservation in a restaurant of our choice",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  @ApiBody({ type: StandardBookingDto })
  async sendListOfParticipants(
    @Body() data,
    @Query("micrositeName") micrositeName: string
  ) {
    const result = await this.resDiaryService.makeStandardBookingInResDiary(
      data,
      micrositeName
    );
    return new ResponseBody(result, null);
  }

  @ApiTags("resdiary")
  @Get("/all-promotions")
  @ApiOperation({
    summary: "Display all available promotions for one of our restaurants",
    description:
      "Once we have the information about the availability in the restaurants, we can also check if a restaurant offers promotions or not",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  async getPromotions(@Query("micrositeName") micrositeName: string) {
    const result =
      await this.resDiaryService.getAllPromotionsAvailableInSpecificRestaurant(
        micrositeName
      );
    return new ResponseBody(result, null);
  }

  @ApiTags("resdiary")
  @Get("/promotions-by-id")
  @ApiOperation({
    summary:
      "Display the details of the current promotion for one of our restaurants",
    description:
      "Display the details of the current promotion for one of our restaurants",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  async getPromotionsById(
    @Query("micrositeName") micrositeName: string,
    @Query("PromotionId", ParseIntPipe) promotionId: number
  ) {
    const result = await this.resDiaryService.getDetailOfSpecificPromotion(
      micrositeName,
      promotionId
    );
    return new ResponseBody(result, null);
  }

  @ApiTags("resdiary")
  @Post("/booking-available-promotion")
  @ApiOperation({
    summary:
      "Standard reservation in one of our restaurants with promotion available and required",
    description:
      "If a restaurant offers promotions we can make reservations in this restaurant by specifying the promotion in question",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  @ApiBody({ type: StandardBookingDto })
  async bookingWithAvailableAndRequiredPromotion(
    @Body() data,
    @Query("micrositeName") micrositeName: string,
    @Query("promotionId", ParseIntPipe) promotionId: number
  ) {
    const result =
      await this.resDiaryService.makeStandardBookingWithAvailableAndRequiredPromotion(
        data,
        promotionId,
        micrositeName
      );
    return new ResponseBody(result, null);
  }

  // @ApiTags("resdiary")
  // @Post("/booking-with-payment-required")
  // @ApiOperation({
  //   summary:
  //     "Confirmation of the reservation either by payment (credit card or other payment)n",
  //   description:
  //     "This feature allows you to confirm the reservation by making a payment by credit card or other if required",
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: "Operation completed.",
  // })
  // @ApiBearerAuth()
  // @ApiBody({ type: StandardBookingDto })
  // async makeStandardReservationWithRequiredPayment(
  //   @Body() data,
  //   @Query("micrositeName") restaurantName: string,
  //   @Query("DepositPaidAmount", ParseIntPipe) DepositPaidAmount: number,
  //   @Query("promotionId", ParseIntPipe) promotionId: number
  // ) {
  //   const result =
  //     await this.resDiaryService.makeStandardReservationWithRequiredPayment(
  //       data,
  //       DepositPaidAmount,
  //       restaurantName,
  //       promotionId
  //     );
  //   return new ResponseBody(result, null);
  // }

  @ApiTags("resdiary")
  @Post("/confirm-payment")
  @ApiOperation({
    summary:
      "Confirmation of the reservation either by payment (credit card or other payment)n",
    description:
      "At this point we confirm the reservation with a stripeToken which is returned when a payment method is required",
  })
  @ApiResponse({
    status: 200,
    description: "Operation completed.",
  })
  @ApiBearerAuth()
  async bookingWithPaymentOption(
    @Query("micrositeName") micrositeName: string,
    @Query("referenceBooking") referenceBooking: string,
    @Query("stripeToken") stripeToken: string
  ) {
    const result = await this.resDiaryService.confirmBookingWithStripeToken(
      stripeToken,
      referenceBooking,
      micrositeName
    );
    return new ResponseBody(result, null);
  }
}
