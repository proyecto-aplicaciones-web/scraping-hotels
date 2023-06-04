import axios from "config/axios";
import { Auth, User } from "types";

export function getAll(): Promise<User[]> {
	return axios
	.get('/users/')
	.then(res => res.data);
}

export function create(data: Partial<User>): Promise<User> {
	return axios
	.post('/users/create/', data)
	.then(res => res.data);
}

export function update(id: number, data: Partial<User>): Promise<User> {
	return axios
	.patch(`/users/modify/${id}/`, data)
	.then(res => res.data);
}

export function toggleStatus(id: number): Promise<any> {
	return axios
	.delete(`users/delete/${id}/`)
	.then(res => console.log(res.data));
}

export function login(data: Pick<User, 'email' | 'password'>): Promise<Auth> {
	return axios
	.post('users/login/', data)
	.then(res => res.data);
}