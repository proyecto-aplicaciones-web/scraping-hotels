import { News, RoomList } from "components";
import { QUERY_KEYS } from "config/tanstackQuery";

function MainPage() {
	return (
		<div >
			<News />
			<section className="mt-16 mx-2 md:mx-12">
				<h2 className="text-lg italic text-center sm:text-start text-primary font-semibold">Accommodation says a lot about your trip</h2>
				<div className="my-6">
					<RoomList query_key={ QUERY_KEYS.ROOM_LIST } />
				</div>
			</section>
		</div>
	);
}

export default MainPage;