import hotelsRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, unauthorizedError } from "@/errors";

async function verifyIfUserHasTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw unauthorizedError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.TicketType.isRemote) {
    throw unauthorizedError();
  }

  if (!ticket.TicketType.includesHotel) {
    throw unauthorizedError();
  }

  if (ticket.status !== "PAID") {
    throw unauthorizedError();
  }
}

async function getHotels(userId: number) {
  await verifyIfUserHasTicket(userId);

  const hotels = await hotelsRepository.findHotels();

  if (hotels.length === 0) {
    throw notFoundError();
  }

  return hotels;
}

async function getRoomsByHotelId(userId: number, hotelId: number) {
  await verifyIfUserHasTicket(userId);

  const rooms = await hotelsRepository.findRoomByHotelId(hotelId);

  if (rooms.Rooms.length === 0) {
    throw notFoundError();
  }

  return rooms;
}

const hotelsService = {
  getHotels,
  getRoomsByHotelId,
};

export default hotelsService;
