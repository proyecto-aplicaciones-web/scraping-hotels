import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Room as IRoom } from "types";

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
					<img className="w-32 sm:w-48 object-contain rounded-md" src="https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=170667a&w=0&k=20&c=O9Y41QO7idN44o-VK5s7dBUqg-dhJZcyagMb8485BNU=" alt="no image" />
				) }
				<div className="flex flex-col gap-1 sm:gap-2 truncate">
					<h5 className="text-primary text-lg italic font-semibold truncate">{ room.name }</h5>
					<p className="truncate">{ room.description }</p>
					<Rating name="half-rating" defaultValue={ room.score / 2 } precision={ 0.5 } readOnly />
					<span>$ { room.price }</span>
				</div>
			</div>
		</Link>
	);
}

export default Room;