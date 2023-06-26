import axios from "config/axios";
import { Room } from "types";

interface getAllOptions {
	page: number;
}

export function makeScraping(): Promise<any> {
	return axios
	.post('/hotel_room/make_scraping/')
	.then(res => res.data);
}

export function getAll({page}: getAllOptions): Promise<Room[]> {
	return axios
	.get(`/hotel_room/?page=${page}&page_size=8`)
	.then(res => res.data);
}

export function getRoomById(id: number): Promise<Room> {
	return axios
	.get(`/hotel_room/${id}/`)
	.then(res => res.data);
}