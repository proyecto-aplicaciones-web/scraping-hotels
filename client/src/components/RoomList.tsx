import { useRooms } from 'hooks';
import Loader from './Loader';
import Room from './Room';

interface RoomListProps {
	query_key: string;
	params?: {
		q?: string;
		order?: string;
	};
}

function RoomList({ query_key, params }: RoomListProps) {
	const { data, lastPostRef, isFetchingNextPage } = useRooms({ query_key, params });

	if (!data) return (
		<div>
			<Loader text='Loading rooms' />
		</div>
	);

	if (data.pages[0].length === 0) return (
		<div className='text-center'>
			<span className='text-xl text-primary'>There are no results!</span>
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
			{ isFetchingNextPage && <div className='w-fit mx-auto mt-6'>
				<Loader />
			</div> }
		</>
	);
}

export default RoomList;