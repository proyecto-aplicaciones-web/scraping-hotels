import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

type Key = 'USER_LIST' | 'NEWS_LIST' | 'LATEST_NEWS';

export const QUERY_KEYS: Record<Key,string> = {
	USER_LIST: 'user_list',
	NEWS_LIST: 'news_list',
	LATEST_NEWS: 'latest_news'
} 