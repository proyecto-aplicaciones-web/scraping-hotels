import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { RoomService } from 'services';
import Loader from './Loader';
import Room from './Room';

function RoomList() {
	const { data: rooms, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.ROOM_LIST],
		queryFn: () => RoomService.getAll()
	});

	if (isLoading || !rooms) return (
		<div>
			<Loader text='Loading rooms' />
		</div>
	);

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8'>
			{ rooms.map(room => (
				<Room key={ room.id } room={ room } />
			)) }
		</div>
	);
}

export default RoomList;