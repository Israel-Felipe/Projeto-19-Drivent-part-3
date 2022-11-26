import hotelsRepository from "@/repositories/hotels-repository";
import { notFoundError } from "@/errors";

async function getHotels() {
  const hotels = await hotelsRepository.findHotels();

  if (hotels.length === 0) {
    throw notFoundError();
  }

  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
