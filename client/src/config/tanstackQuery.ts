import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

type Key = 'USER_LIST' | 'NEWS_LIST' | 'LATEST_NEWS' | 'MOST_VISITED_ROOMS' | 'VISITED_ROOMS' | 'ROOM' | 'ROOM_LIST';

export const QUERY_KEYS: Record<Key,string> = {
	USER_LIST: 'user_list',
	NEWS_LIST: 'news_list',
	LATEST_NEWS: 'latest_news',
	MOST_VISITED_ROOMS: 'most_visited_rooms',
	VISITED_ROOMS: 'visited_rooms',
	ROOM: 'room',
	ROOM_LIST: 'room_list'
} 