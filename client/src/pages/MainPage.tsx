import { LoginOutlined, SearchSharp } from "@mui/icons-material";
import { News } from "components";
import { Link } from "react-router-dom";

function MainPage() {

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('submit');

	};

	return (
		<main className="">
			<nav className="flex items-center justify-between py-2 mx-2 mb-2 sm:mb-6 md:mx-12">
				<div className='h-10 sm:h-12 flex gap-2 items-center font-boogaloo text-xl md:text-2xl'>
					<img className="h-full" src="/logo.svg" alt='scraping hotels logo' />
					<span className="hidden sm:block">Scraping Hotels</span>
				</div>
				<div className="flex gap-1 items-center">
					<form onSubmit={ onSearch } autoComplete="off" className="flex items-stretch w-auto sm:w-72">
						<input type="text" className="flex-1 w-32 sm:w-auto border px-2 py-1 rounded-l-lg focus:outline -outline-offset-1 outline-primary" placeholder="Search ..." />
						<button type="submit" className="bg-primary px-2 rounded-r-lg"><SearchSharp fontSize="medium" className="text-white" /></button>
					</form>
					<Link className="inline-block rounded-lg border border-primary px-2 py-1 text-primary hover:bg-primary hover:text-white transition-colors" to="/signin"><LoginOutlined fontSize="small" /></Link>
				</div>
			</nav>
			<News />
			<section className="mt-6 mx-2 md:mx-12">
				<h2 className="text-lg italic text-center sm:text-start text-primary font-semibold">Accommodation says a lot about your trip</h2>
				<Link className="inline-block text-primary underline" to="/admin">Admin</Link>
				{/* <HotelList/> */ }
			</section>
		</main>
	);
}

export default MainPage;