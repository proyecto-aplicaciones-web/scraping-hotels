import { useQuery } from '@tanstack/react-query';
import { MakeScraping } from 'components';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { RoomService, UserService } from 'services';
import Ranking from "./Ranking";
import RankingChart from './RankingChart';

function Dashboard() {
	const { data: totalUsers } = useQuery({
		queryKey: [QUERY_KEYS.USERS_TOTAL_COUNT],
		queryFn: () => UserService.getTotalCount()
	});

	const { data: totalRooms } = useQuery({
		queryKey: [QUERY_KEYS.ROOMS_TOTAL_COUNT],
		queryFn: () => RoomService.getTotalCount()
	});

	return (
		<main className='relative grid grid-cols-12 gap-2'>
			<div className="col-span-full sm:col-span-6">
				<div className='flex justify-center items-center gap-4 bg-primary/20 rounded-lg p-4 uppercase tracking-wider shadow-sm shadow-neutral-600'>
					<span className='text-md'>users</span>
					<span className='text-lg md:text-xl text-secondary'>{ totalUsers }</span>
				</div>
			</div>
			<div className="col-span-full sm:col-span-6">
				<div className='flex justify-center items-center gap-4 bg-primary/50 rounded-lg p-4 uppercase tracking-wider shadow-sm shadow-neutral-600'>
					<span className='text-md'>rooms</span>
					<span className='text-lg md:text-xl text-secondary'>{ totalRooms }</span>
				</div>
			</div>
			<div className="col-span-full 2xl:col-span-4">
				<Ranking />
			</div>
			<div className="col-span-full 2xl:col-span-8 pb-6 md:pb-0">
				<RankingChart />
			</div>
			<div className='fixed right-4 bottom-2'>
				<MakeScraping />
			</div>
		</main>
	);
}

export default Dashboard;