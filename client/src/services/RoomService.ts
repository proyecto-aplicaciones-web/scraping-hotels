import axios from "config/axios";
import { Room } from "types";

interface getAllOptions {
	page: number;
	params?: {
		q?: string;
		order?: string;
	}
}

export function makeScraping(): Promise<any> {
	return axios
	.post('/hotel_room/make_scraping/')
	.then(res => res.data);
}

export function getTotalCount(): Promise<number> {
	return axios
	.get('/hotel_room/count/')
	.then(res => res.data.count);
}

export function getAll({page,params}: getAllOptions): Promise<Room[]> {
	return axios
	.get(`/hotel_room/?page_size=8`, {
		params: {page, ...params}
	})
	.then(res => res.data);
}

export function getRoomById(id: number): Promise<Room> {
	return axios
	.get(`/hotel_room/${id}/`)
	.then(res => res.data);
}