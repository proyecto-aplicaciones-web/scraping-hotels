import { useQuery } from "@tanstack/react-query";
import { Room } from "components";
import { QUERY_KEYS } from "config/tanstackQuery";
import { useParams } from "react-router-dom";
import { UserQueryService } from "services";

function VisitedHotels() {
	const { userId } = useParams();
	const { data: rooms } = useQuery({
		queryKey: [QUERY_KEYS.VISITED_ROOMS, userId],
		queryFn: () => UserQueryService.getVisitedRoomsByUserId(parseInt(userId!))
	});
	return (
		<div className="max-w-6xl mx-auto space-y-4">
			{ rooms?.map(room => (
				<Room room={ room } />
			)) }
		</div>
	);
}

export default VisitedHotels;