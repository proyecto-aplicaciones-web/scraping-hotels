import { Logo } from "components";
import { Link } from "react-router-dom";

function MainPage() {
	return (
		<div>
			<nav className="flex items-center justify-between px-2 sm:px-4 py-2">
				<Logo />
				<Link className="inline-block text-primary font-boogaloo text-lg sm:text-xl" to="/signin">Sign In</Link>
			</nav>
		</div>
	);
}

export default MainPage;