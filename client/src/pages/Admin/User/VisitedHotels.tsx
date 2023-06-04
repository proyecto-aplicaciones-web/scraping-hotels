import { useQuery } from "@tanstack/react-query";
import { Room } from "components";
import { QUERY_KEYS } from "config/tanstackQuery";
import { useParams } from "react-router-dom";
import { UserQueryService } from "services";

function VisitedHotels() {
	const { userId } = useParams();
	const { data: rooms, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.VISITED_ROOMS, userId],
		queryFn: () => UserQueryService.getVisitedRoomsByUserId(parseInt(userId!))
	});

	if (isLoading) return <span>Loading...</span>;

	return (
		<div className="max-w-6xl mx-auto space-y-4">
			{ rooms?.map(room => (
				<Room key={ room.id } room={ room } />
			)) }
		</div>
	);
}

export default VisitedHotels;