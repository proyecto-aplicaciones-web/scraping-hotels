import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Room as IRoom } from "types";
import { formatCurrency } from "utils";

interface RoomProps {
	room: IRoom;
}

function Room({ room }: RoomProps) {
	return (
		<Link className="block" to={ `/rooms/${room.id}` }>
			<div className="w-full flex gap-2 sm:gap-4 text-sm sm:text-base">
				{ room.images.length ? (
					<img className="w-32 sm:w-48 object-cover sm:object-contain rounded-md" src={ room.images[0].image } alt={ `room image ${room.name}` } />
				) : (
					<img className="w-32 sm:w-48 object-contain rounded-md" src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="no image" />
				) }
				<div className="flex flex-col gap-1 sm:gap-2 truncate">
					<h5 className="text-primary text-lg italic font-semibold truncate">{ room.name }</h5>
					<p className="truncate">{ room.description }</p>
					<Rating name="half-rating" defaultValue={ room.score === -1 ? 3 : room.score / 2 } precision={ 0.5 } readOnly />
					{ room.price === -1 ? (
						<span className="text-red-500">Price not available</span>
					) : (
						<span>{ formatCurrency(room.price) }</span>
					) }
				</div>
			</div>
		</Link>
	);
}

export default Room;