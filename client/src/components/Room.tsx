import { OpenInNewOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { Room as IRoom } from "types";

interface RoomProps {
	room: IRoom;
}

function Room({ room }: RoomProps) {
	return (
		<div className="w-full flex gap-2 sm:gap-4 text-sm sm:text-base">
			{ room.images.length ? (
				<img className="w-32 sm:w-48 object-cover sm:object-contain rounded-md" src={ room.images[0].image } alt={ `room image ${room.name}` } />
			) : (
				<span>empty</span>
			) }
			<div className="flex flex-col gap-1 sm:gap-2 truncate">
				<h5 className="text-primary text-lg italic font-semibold truncate">{ room.name }</h5>
				<p className="max-h-24 truncate">{ room.description } Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit aliquid inventore temporibus quod fuga non delectus facilis. Ex eos fuga ipsam vitae corporis incidunt omnis dicta consectetur! Repellat laborum, a sint atque eum praesentium quo quae accusantium nam, sapiente, unde vero neque at reprehenderit eius modi sed debitis quidem mollitia!</p>
				<Rating name="half-rating-read" defaultValue={ room.score / 2 } precision={ 0.5 } readOnly />
				<div className="flex justify-between items-center">
					<span>$ { room.price }</span>
					<a className="w-5 sm:w-auto" href={ room.link } target="_blank">
						<OpenInNewOutlined className="text-primary" />
					</a>
				</div>
			</div>
		</div>
	);
}

export default Room;