import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany({});
}

async function findRoomByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  findHotels,
  findRoomByHotelId,
};

export default hotelsRepository;
