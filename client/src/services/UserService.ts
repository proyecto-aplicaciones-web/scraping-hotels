import axios from "config/axios";
import { User } from "types";

export function getUserList(): Promise<User[]> {
	return axios
	.get('/get_users/')
	.then(res => res.data.users);
}