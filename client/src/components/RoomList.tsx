import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { RoomService } from 'services';
import Loader from './Loader';
import Room from './Room';
import { useCallback, useRef } from 'react';

function RoomList() {
	const {
		fetchNextPage, //function 
		hasNextPage, // boolean
		isFetchingNextPage, // boolean
		data,
		status,
		error
	} = useInfiniteQuery([QUERY_KEYS.ROOM_LIST], ({ pageParam = 1 }) => RoomService.getAll({ page: pageParam }), {
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		}
	});

	const intObserver = useRef<any>();

	const lastPostRef = useCallback((room: any) => {
		if (isFetchingNextPage) return;

		if (intObserver.current) intObserver.current.disconnect();

		intObserver.current = new IntersectionObserver(rooms => {
			if (rooms[0].isIntersecting && hasNextPage) {
				!error && fetchNextPage();
			}
		});

		if (room) intObserver.current.observe(room);
	}, [isFetchingNextPage, fetchNextPage, hasNextPage]);

	// if (status === 'error') return <p className=s'center'>Error: { error.message }</p>;

	if (!data) return (
		<div>
			<Loader text='Loading rooms' />
		</div>
	);

	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8'>
				{ data?.pages.map(pg => {
					return pg.map((room, i) => {
						if (pg.length === i + 1) {
							return <Room ref={ lastPostRef } key={ room.id } room={ room } />;
						}
						return <Room key={ room.id } room={ room } />;
					});
				}) }
			</div>
			{ isFetchingNextPage && !error && <div className='w-fit mx-auto mt-6'>
				<Loader />
			</div> }
		</>
	);
}

export default RoomList;