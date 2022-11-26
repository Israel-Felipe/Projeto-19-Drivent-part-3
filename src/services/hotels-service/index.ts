import hotelsRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, unauthorizedError } from "@/errors";

async function getHotels(userId: number) {
  await verifyIfUserHasTicket(userId);

  const hotels = await hotelsRepository.findHotels();

  if (hotels.length === 0) {
    throw notFoundError();
  }

  return hotels;
}

async function verifyIfUserHasTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw unauthorizedError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw unauthorizedError();
  }

  if (ticket.TicketType.isRemote) {
    throw unauthorizedError();
  }

  if (!ticket.TicketType.includesHotel) {
    throw unauthorizedError();
  }
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
