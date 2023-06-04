interface RoomImage {
	id: number;
	image: string;
	hotel_room_id: number;
}
interface RoomService {
	id: number;
	service: string;
	hotel_room_id: number;
}

interface Room {
	id: number;
	name: string;
	description: string;
	price: number;
	score: number;
	geolocation: string;
	link: string;
	discount: boolean;
	images: RoomImage[];
	services: RoomService[];
}

export default Room;