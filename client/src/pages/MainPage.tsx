import { Logo } from "components";
import { Link } from "react-router-dom";

function MainPage() {
	return (
		<main>
			<nav className="flex items-center justify-between px-2 sm:px-4 py-2">
				<Logo />
				<Link className="inline-block text-primary font-boogaloo text-lg sm:text-xl" to="/signin">Sign In</Link>
			</nav>
			<div className="mt-12 m-6">
				<Link className="inline-block text-primary underline" to="/admin">Admin</Link>
			</div>
		</main>
	);
}

export default MainPage;