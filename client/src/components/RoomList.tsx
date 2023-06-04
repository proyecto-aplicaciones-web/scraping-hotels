import { useQuery } from '@tanstack/react-query';
import Room from './Room';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { RoomService } from 'services';

function RoomList() {
	const { data: rooms, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.ROOM_LIST],
		queryFn: () => RoomService.getAll()
	});

	if (isLoading || !rooms) return <span>Loading...</span>;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8'>
			{ rooms.map(room => (
				<Room key={ room.id } room={ room } />
			)) }
		</div>
	);
}

export default RoomList;