import Slider, { Settings } from "react-slick";


const news = [
	{
		title: 'new 1',
		description: "description 1",
		image: 'https://img.pikbest.com/backgrounds/20210920/booking-luxury-hotel-banner-background-eps_6126596.jpg!w700wp'
	},
	{
		title: 'new 2',
		description: "description 2",
		image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hotel-banner-design-template-1de13b74017249deddd2c4c37c4dd531_screen.jpg?ts=1611053446'
	},
	{
		title: 'new 3',
		description: "description 3",
		image: 'https://img.pikbest.com/backgrounds/20210920/booking-luxury-hotel-banner-background-eps_6126596.jpg!w700wp'
	},
];

const settings: Settings = {
	dots: true,
	infinite: true,
	speed: 1000,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 4000,
	pauseOnHover: true,
	arrows: false,
};

function News() {
	return (
		<Slider { ...settings }>
			{ news.map((item, idx) => <New key={ idx } item={ item } />) }
		</Slider>
	);
}

interface NewProps {
	item: any;
}

function New({ item }: NewProps) {
	return (
		<section>
			<div className="flex flex-col lg:items-stretch lg:flex-row gap-4 lg:h-72 mx-2 lg:mx-12">
				<img className="lg:flex-1 rounded-lg bg-primary object-cover lg:mx-0 h-56 lg:h-auto" src={ item.image } alt="image1" />
				<div className="text-center hover:overflow-overlay mx-auto lg:mx-0">
					<h2 className="text-xl italic font-semibold">{ item.title }</h2>
					<p className="max-w-prose">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, natus, debitis reprehenderit officia tempore nulla voluptatem accusantium rerum culpa consequuntur ipsum perferendis soluta in ipsa. Consequuntur sunt id nihil est.</p>
				</div>
			</div>
		</section>
	);
}

export default News;