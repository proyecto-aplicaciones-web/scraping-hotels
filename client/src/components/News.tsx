import Slider, { Settings } from "react-slick";

const settings: Settings = {
	dots: true,
	infinite: true,
	speed: 1000,
	slidesToShow: 1,
	slidesToScroll: 1,
	// autoplay: true,
	autoplaySpeed: 4000,
	pauseOnHover: true,
	arrows: false,
};

function News() {
	return (
		<Slider { ...settings }>
			{ [1, 2, 3].map(idx => <New key={ idx } index={ idx } />) }
		</Slider>
	);
}

interface NewProps {
	index: number;
}

function New({ index }: NewProps) {
	return (
		<section>
			<div className="flex flex-col md:items-stretch md:flex-row gap-4 md:h-72 mx-2 md:mx-12">
				<img className="md:flex-1 rounded-lg bg-primary object-cover md:max-w-none md:mx-0 h-56 md:h-auto" src="https://images.unsplash.com/photo-1506765515384-028b60a970df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" alt="image1" />
				<div className="max-w-prose text-center hover:overflow-overlay mx-auto md:mx-0">
					<h2 className="text-xl italic font-semibold">Latest offers { index }</h2>
					<p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum laborum repudiandae, dolores delectus repellendus dolor modi omnis reiciendis distinctio non.</p>
					<p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum laborum repudiandae, dolores delectus repellendus dolor modi omnis reiciendis distinctio non.</p>
				</div>
			</div>
		</section>
	);
}

export default News;