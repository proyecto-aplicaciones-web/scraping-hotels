import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { RoomService } from 'services';

interface useRoomsProps {
	query_key: string;
	params?: {
		q?: string;
		order?: string;
	}
}

function useRooms({query_key,params}: useRoomsProps) {
	const query = useInfiniteQuery([query_key, [params?.q, params?.order]], ({ pageParam = 1 }) => RoomService.getAll({ page: pageParam, params }), {
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		},
		retry: false
	});

	const intObserver = useRef<any>();

	const lastPostRef = useCallback((room: any) => {
		if (query.isFetchingNextPage) return;

		if (intObserver.current) intObserver.current.disconnect();

		intObserver.current = new IntersectionObserver(rooms => {
			if (rooms[0].isIntersecting && query.hasNextPage) {
				!query.error && query.fetchNextPage();
			}
		});

		if (room) intObserver.current.observe(room);
	}, [query.isFetchingNextPage, query.fetchNextPage, query.hasNextPage]);

	return {
		...query,
		intObserver,
		lastPostRef
	}
}

export default useRooms