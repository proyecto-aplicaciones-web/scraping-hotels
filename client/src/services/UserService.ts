import axios from "config/axios";
import { User } from "types";

export function getUserList(): Promise<User[]> {
	return axios
	.get('/get_users/')
	.then(res => res.data.users);
}

export function updateUser(id: number): Promise<any> {
	return axios
	.put(`/modify_user/${id}/`)
	.then(res => console.log(res.data));
}

export function toggleUserStatus(id: number): Promise<any> {
	return axios
	.delete(`/delete_user/${id}/`)
	.then(res => console.log(res.data));
}