import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Ranking from "./Ranking";

function Dashboard() {
	return (
		<main className='grid grid-cols-12 gap-4 2xl:gap-0'>
			<div className="col-span-full 2xl:col-span-4">
				<Ranking />
			</div>
			<div className="col-span-full 2xl:col-span-8">
				<Chart />
			</div>
		</main>
	);
}

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

function Chart() {

	return (
		<ResponsiveContainer width="100%" height={ 500 }>
			<LineChart
				width={ 500 }
				height={ 300 }
				data={ data }
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={ { r: 8 } } />
				<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default Dashboard;