import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

type Key = 'USER_LIST' | 'NEWS_LIST';

export const QUERY_KEYS: Record<Key,string> = {
	USER_LIST: 'user_list',
	NEWS_LIST: 'news_list',
} 