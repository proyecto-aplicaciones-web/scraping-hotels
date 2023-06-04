import { ArrowRightAltRounded, LoginOutlined, SearchSharp } from "@mui/icons-material";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function MainLayout() {
	const { auth, logout } = useAuth();

	const [isVisibleAuthInfo, setIsVisibleAuthInfo] = useState(false);

	const toggleAuthInfoModal = () => setIsVisibleAuthInfo(prev => !prev);

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<main>
			{ auth?.role === 'admin' && <div className="w-full bg-secondary py-1 px-2">
				<Link to="/admin" className="flex items-center gap-1 w-fit ml-auto text-sm  uppercase italic text-white tracking-wide font-semibold"><span>administrator</span><ArrowRightAltRounded /></Link>
			</div> }
			<nav className="flex items-center justify-between py-2 mx-2 mb-2 sm:mb-4 md:mx-12">
				<Link to="/">
					<div className='h-10 sm:h-12 flex gap-2 items-center font-boogaloo text-xl md:text-2xl'>
						<img className="h-full" src="/logo.svg" alt='scraping hotels logo' />
						<span className="hidden sm:block">Scraping Hotels</span>
					</div>
				</Link>
				<div className="flex gap-2 items-center">
					<form onSubmit={ onSearch } autoComplete="off" className="flex items-stretch w-auto sm:w-72">
						<input type="text" className="flex-1 w-32 sm:w-auto border px-2 py-1 rounded-l-lg focus:outline -outline-offset-1 outline-primary" placeholder="Search ..." />
						<button type="submit" className="bg-primary px-2 rounded-r-lg"><SearchSharp fontSize="medium" className="text-white" /></button>
					</form>
					{ !!auth
						? (
							<div className="relative">
								<button className="w-10 aspect-square rounded-full bg-primary hover:bg-secondary transition-colors text-white flex items-center justify-center text-lg font-semibold tracking-wider shadow-sm shadow-black/40" onClick={ toggleAuthInfoModal }>
									{ (auth.first_name[0] + auth.last_name[0]).toUpperCase() }
								</button>
								{ isVisibleAuthInfo && <div className="block absolute z-50 bg-white rounded-md right-0 top-12 min-w-36 text-center space-y-2 p-4 shadow-sm shadow-black/40">
									<p className="capitalize">{ auth.first_name } { auth.last_name }</p>
									<p>{ auth.email }</p>
									<button className="bg-red-500 border border-red-500 py-1 w-full rounded-md text-white font-semibold hover:bg-white hover:text-red-500 transition-colors"
										onClick={ logout }>Logout</button>
								</div> }
							</div>
						)
						: (
							<Link className="inline-block rounded-lg border border-primary px-2 py-1 text-primary hover:bg-primary hover:text-white transition-colors" to="/signin"><LoginOutlined fontSize="small" /></Link>
						) }
				</div>
			</nav>
			<Outlet />
		</main>
	);
}

export default MainLayout;