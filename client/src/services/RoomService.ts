import axios from "config/axios";
import { Room } from "types";

export function getAll(): Promise<Room[]> {
	return axios
	.get('/hotel_room/')
	.then(res => res.data);
}

export function getRoomById(id: number): Promise<Room> {
	return axios
	.get(`/hotel_room/${id}/`)
	.then(res => res.data);
}