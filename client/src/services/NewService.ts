import axios from "config/axios";
import { New } from "types";

export function getNewsList(): Promise<New[]> {
	return axios
	.get('/news/')
	.then(res => res.data);
}