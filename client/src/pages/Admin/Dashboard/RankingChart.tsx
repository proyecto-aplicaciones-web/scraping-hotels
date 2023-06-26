import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { useMemo } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UserQueryService } from 'services';

const data = [
	{
		name: 'Item A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Item B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Item C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Item D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	}
];

function RankingChart() {
	const { data: ranking, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.MOST_VISITED_ROOMS],
		queryFn: () => UserQueryService.getMostVisitedRooms()
	});

	const rooms = useMemo(
		() => ranking?.map(room => ({
			name: room.name,
			price: room.price === -1 ? 0 : room.price,
			hasDiscount: room.discount,
			visits: room.visits
		})),
		[ranking]
	);

	return (
		<ResponsiveContainer width="100%" height={ 500 }>
			<LineChart
				width={ 500 }
				height={ 300 }
				data={ rooms }
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" display="none" />
				<YAxis yAxisId="left" />
				<YAxis yAxisId="right" orientation="right" />
				<Tooltip />
				<Legend />
				<Line yAxisId="left" type="monotone" dataKey="visits" stroke="#536dfe" activeDot={ { r: 6 } } />
				<Line yAxisId="right" type="monotone" dataKey="price" display="flex" stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default RankingChart;