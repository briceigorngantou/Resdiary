import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from "@nestjs/common";

export class ResponseBody {
  data: any;
  error: any;
  constructor(data: any, error: any) {
    this.data = data;
    this.error = error;
  }
}

export function responseException(e: any) {
  if (e?.response?.status === 400) {
    return Promise.reject(new BadRequestException(e?.response?.data?.Message));
  } else {
    if (e?.response?.status === 404 || 403) {
      return Promise.reject(new ForbiddenException(e?.response?.data?.Message));
    } else {
      return Promise.reject(
        new InternalServerErrorException(
          e?.status === 500
            ? e?.message
            : "Request failed. Something went wrong"
        )
      );
    }
  }
}
