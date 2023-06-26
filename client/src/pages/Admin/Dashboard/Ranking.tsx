import { TourOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "components";
import { QUERY_KEYS } from "config/tanstackQuery";
import { Link } from "react-router-dom";
import { UserQueryService } from 'services';

function Ranking() {
	const { data: ranking, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.MOST_VISITED_ROOMS],
		queryFn: () => UserQueryService.getMostVisitedRooms()
	});

	return (
		<div className="w-full text-center rounded-md shadow-md shadow-black/40">
			<h4 className='text-primary text-lg italic font-semibold my-2'>Most visited hotel rooms</h4>
			{ isLoading ? (
				<div className="h-24 flex items-center justify-center">
					<Loader />
				</div>
			) : (
				<ul className="flex flex-col place-items-stretch gap-2 divide-y">
					{ ranking?.map(room => (
						<Link key={ room.id } className="block" to={ `/rooms/${room.id}` }>
							<li className="flex items-center gap-4 py-2 sm:py-0 hover:bg-primary/10 px-2">
								{ room.images.length ? (
									<img className="hidden sm:block w-24 object-contain rounded-md my-2 shadow-sm shadow-black/70" src={ room.images[0]?.image } alt={ `room image ${room.images[0]?.id}` } />
								) : (
									<img className="hidden sm:block w-24 object-contain rounded-md" src="https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=170667a&w=0&k=20&c=O9Y41QO7idN44o-VK5s7dBUqg-dhJZcyagMb8485BNU=" alt="no image" />
								) }
								<div className="flex-1 flex items-center justify-between gap-8">
									<div className="flex flex-col justify-center items-start max-w-[12rem] truncate">
										<h5 className="ml-1 truncate">{ room.name }</h5>
										<Rating name="half-rating-read" defaultValue={ room.score === -1 ? 3 : room.score } precision={ 1 } readOnly />
									</div>
									<div className="flex items-center gap-2 bg-primary rounded-full px-2 py-1 text-white shadow-sm shadow-black/40">
										<TourOutlined />
										<span>{ room.visits }</span>
									</div>
								</div>
							</li>
						</Link>
					)) }
				</ul>
			) }
		</div>
	);
}

export default Ranking;