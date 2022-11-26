import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotelList = await hotelsService.getHotels();

    return res.status(httpStatus.OK).send(hotelList);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
