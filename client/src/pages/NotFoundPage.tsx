import { Logo } from "components";
import { Link } from "react-router-dom";

function NotFoundPage() {
	return (
		<main className="flex items-center justify-center h-screen w-screen">
			<div className="text-center space-y-4 -translate-y-12">
				<Link to="/">
					<Logo className="justify-center" />
				</Link>
				<h1 className="text-2xl text-primary font-bold">404 - Page Not Found</h1>
				<p className="text-lg">Whoops! That page doesn’t exist. But you can still go check out the <Link to="/"><span className="italic text-primary">best hotels</span></Link>!</p>
			</div>
		</main>
	);
}

export default NotFoundPage;