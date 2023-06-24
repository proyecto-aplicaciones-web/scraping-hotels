import { ArrowBackRounded, OpenInNewOutlined, ScatterPlotRounded } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GoogleMap, Loader } from "components";
import { QUERY_KEYS } from "config/tanstackQuery";
import { useAuth } from "context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { RoomService, UserQueryService } from "services";
import { formatCurrency } from "utils";

const settings: Settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 3000,
	pauseOnHover: false,
	arrows: false,
};

function RoomDetails() {
	const { roomId } = useParams();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);

	const { data: room, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.ROOM, roomId],
		queryFn: () => RoomService.getRoomById(parseInt(roomId!)),
		onSuccess: () => {
			if (auth?.role === 'admin' && !isFirstLoad) return;
			setIsFirstLoad(true);
			incrementVisits();
		}
	});

	const { mutate: incrementVisits } = useMutation({
		mutationFn: () => UserQueryService.incrementVisits({
			userId: auth?.id!,
			roomId: parseInt(roomId!)
		})
	});

	const goBack = () => navigate(-1);

	if (isLoading || !room) return (
		<div className="w-screen h-screen flex items-center justify-center">
			<Loader text="Loading room details" />
		</div>
	);


	return (
		<main className="mx-2 md:mx-12 mt-2 mb-4">
			<button className="text-primary flex items-center gap-1" onClick={ goBack }>
				<ArrowBackRounded />
				<span>Back</span>
			</button>
			<div className="space-y-8 mt-2">
				<div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-4 ">
					{ room.images.length > 1 ? (
						<Slider { ...settings } className="mx-auto lg:mx-0 max-w-full sm:max-w-lg lg:max-w-fit col-span-1">
							{ room.images.map(image => (
								<picture key={ image.id } className="px-2">
									<img className="mx-auto" src={ image.image } alt={ `${room.name} image ${image.id}` } />
								</picture>
							)) }
						</Slider>
					) : room.images.length ? (
						<picture className="max-w-lg lg:max-w-fit">
							<img className="mx-auto" src={ room.images[0].image } alt={ `${room.name} image` } />
						</picture>
					) : (
						<picture className="max-w-lg lg:max-w-fit">
							<img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="no image" />
						</picture>
					) }
					<div className="col-span-2 flex flex-col justify-around">
						<div className="space-y-4">
							<div className="flex justify-between items-center gap-4">
								<h4 className="text-2xl text-primary italic font-semibold tracking-wider">{ room.name }</h4>
								{ !room.discount && <span className="bg-emerald-500 rounded-full px-4 py-1 shadow-sm shadow-black/40 text-white font-bold">OFFER!</span> }
							</div>
							<p className="text-justify">{ room.description }</p>
						</div>
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
									{ room.price === -1 ? (
										<span>Book now!</span>
									) : (
										<span>{ formatCurrency(room.price) }</span>
									) }
									<OpenInNewOutlined />
								</a>
								<Rating name="half-rating-read" defaultValue={ room.score === -1 ? 3 : room.score / 2 } precision={ 0.5 } readOnly />
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-4xl mx-auto pt-8">
					<GoogleMap address={ room.geolocation } />
				</div>
			</div>
		</main>
	);
}

export default RoomDetails;