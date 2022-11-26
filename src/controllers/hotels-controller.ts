import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotelList = await hotelsService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotelList);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send([]);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);

  if (!hotelId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const roomsList = await hotelsService.getRoomsByHotelId(userId, hotelId);

    return res.status(httpStatus.OK).send(roomsList);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send([]);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
