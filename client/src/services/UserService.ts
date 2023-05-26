import axios from "config/axios";
import { User } from "types";

export function getUserList(): Promise<User[]> {
	return axios
	.get('/users/')
	.then(res => res.data);
}

export function updateUser(id: number): Promise<any> {
	return axios
	.put(`/users/modify/${id}/`)
	.then(res => console.log(res.data));
}

export function toggleUserStatus(id: number): Promise<any> {
	return axios
	.delete(`users/delete/${id}/`)
	.then(res => console.log(res.data));
}