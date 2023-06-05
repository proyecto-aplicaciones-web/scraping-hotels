import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "config/tanstackQuery";
import Slider, { Settings } from "react-slick";
import { NewService } from "services";
import Loader from "./Loader";

const settings: Settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 10000,
	pauseOnHover: true,
	arrows: false,
};

function News() {
	const { data: news, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.LATEST_NEWS],
		queryFn: () => NewService.getNewsList({ limit: 5 })
	});

	return (
		<Slider { ...settings }>
			{ isLoading ? (
				<div className="lg:h-72 mx-4 lg:mx-auto lg:max-h-[30vh] text-center">
					<Loader text="Loading latest news" />
				</div>
			) : news?.map((item, idx) => <New key={ idx } item={ item } />) }
		</Slider>
	);
}

interface NewProps {
	item: any;
}

function New({ item }: NewProps) {
	return (
		<section>
			<div className="flex flex-col lg:items-stretch lg:justify-center lg:max-w-[80vw] lg:gap-12 lg:flex-row gap-4 lg:h-72 mx-4 lg:mx-auto lg:max-h-[30vh]">
				<img className="rounded-lg object-contain lg:mx-0 h-56 lg:h-auto" src={ item.image } alt="image1" />
				<div className="text-center hover:overflow-overlay mx-auto space-y-4 lg:mx-0">
					<h2 className="text-xl italic font-semibold">{ item.title }</h2>
					<p className="max-w-prose mx-auto">{ item.description }</p>
				</div>
			</div>
		</section>
	);
}

export default News;