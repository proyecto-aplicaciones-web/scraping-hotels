import axios from "config/axios";
import { Room } from "types";

type TopRoom = Room & {visits: number}

export function getMostVisitedRooms(): Promise<TopRoom[]> {
	return axios
	.get('/user_query/most_visited_rooms/')
	.then(res => res.data);
}

export function getVisitedRoomsByUserId(id: number): Promise<Room[]> {
	return axios
	.get(`/user_query/user_visited_rooms/${id}/`)
	.then(res => res.data);
}