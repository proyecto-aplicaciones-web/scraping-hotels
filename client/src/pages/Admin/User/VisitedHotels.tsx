import { useQuery } from "@tanstack/react-query";
import { Loader, Room } from "components";
import { QUERY_KEYS } from "config/tanstackQuery";
import { useParams } from "react-router-dom";
import { UserQueryService } from "services";

function VisitedHotels() {
	const { userId } = useParams();
	const { data: rooms, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.VISITED_ROOMS, userId],
		queryFn: () => UserQueryService.getVisitedRoomsByUserId(parseInt(userId!))
	});

	if (isLoading) return (
		<div className="w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-1rem)] flex items-center justify-center">
			<Loader text="Loading rooms" />
		</div>
	);

	if (!rooms?.length) return (
		<div className="w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-1rem)] flex items-center justify-center">
			<span>This user has not visited any rooms</span>
		</div>
	);

	return (
		<div className="max-w-6xl mx-auto space-y-4">
			{ rooms?.map(room => (
				<Room key={ room.id } room={ room } />
			)) }
		</div>
	);
}

export default VisitedHotels;