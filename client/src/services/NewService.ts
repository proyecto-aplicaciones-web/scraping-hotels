import axios from "config/axios";
import { New } from "types";

interface GetNewsList {
	limit?: number
}

export function getNewsList({limit}: GetNewsList): Promise<New[]> {
	return axios
	.get('/news/', {
		params: {
			limit
		}
	})
	.then(res => res.data);
}

export function create(data: Partial<New>): Promise<New> {
	return axios
	.post('/news/create/', data)
	.then(res => res.data);
}

export function update(id: number, data: Partial<New>): Promise<New> {
	return axios
	.patch(`/news/modify/${id}/`, data)
	.then(res => res.data);
}

export function remove(id: number): Promise<any> {
	return axios
	.delete(`/news/delete/${id}/`)
	.then(res => res.data);
}