import { ArrowBackRounded, OpenInNewOutlined, ScatterPlotRounded } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GoogleMap } from "components";
import { QUERY_KEYS } from "config/tanstackQuery";
import { useNavigate, useParams } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { RoomService } from "services";

const settings: Settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	pauseOnHover: false,
	arrows: false,
};

function RoomDetails() {
	const { roomId } = useParams();
	const navigate = useNavigate();
	const { data: room, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.ROOM, roomId],
		queryFn: () => RoomService.getRoomById(parseInt(roomId!))
	});

	const goBack = () => navigate(-1);

	if (isLoading || !room) return <span>Loading...</span>;

	return (
		<main className="mx-2 md:mx-12 mt-2 mb-4">
			<button className="text-primary" onClick={ goBack }>
				<ArrowBackRounded />
			</button>
			<div className="space-y-8 mt-2">
				<div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-4 items-center">
					{ room.images.length > 1 ? (
						<Slider { ...settings } className="mx-auto lg:mx-0 max-w-full sm:max-w-lg lg:max-w-fit col-span-1">
							{ room.images.map(image => (
								<picture key={ image.id } className="px-2">
									<img src={ image.image } alt={ `${room.name} image ${image.id}` } />
								</picture>
							)) }
						</Slider>
					) : (
						<picture className="max-w-lg lg:max-w-fit">
							<img src={ room.images[0].image } alt={ `${room.name} image` } />
						</picture>
					) }
					<div className="col-span-2 space-y-4">
						<div className="flex justify-between items-center gap-4">
							<h4 className="text-2xl text-primary italic font-semibold tracking-wider">{ room.name }</h4>
							{ !room.discount && <span className="bg-emerald-500 rounded-full px-4 py-1 shadow-sm shadow-black/40 text-white font-bold">OFFER!</span> }
						</div>
						<p className="text-justify">{ room.description }</p>
						<div className="flex justify-between items-end">
							<div>
								<h6 className="text-lg tracking-wide text-secondary mb-2 font-semibold">Services</h6>
								{ room.services.length ? (
									<ul>
										{ room.services.map(service => (
											<li key={ service.id } className="flex items-center gap-2">
												<ScatterPlotRounded className="text-primary" />
												<span>{ service.service }</span>
											</li>
										)) }
									</ul>
								) : (
									<span>No services available</span>
								) }
							</div>
							<div className="flex flex-col items-end gap-2">
								<a className="flex justify-between gap-4 items-center p-2 rounded-sm border border-primary text-primary" href={ room.link } target="_blank">
									<span className="pr-1 text-lg tracking-wide italic">$ { room.price }</span>
									<OpenInNewOutlined />
								</a>
								<Rating name="half-rating-read" defaultValue={ room.score / 2 } precision={ 0.5 } readOnly />
							</div>
						</div>
					</div>
				</div>
				<GoogleMap />
			</div>
		</main>
	);
}

export default RoomDetails;