import { Logo } from "components";
import { Link } from "react-router-dom";

function AdminPage() {
	return (
		<>
			<Sidebar />
			<div className="ml-[14rem] p-2">
				<header>
					<nav className="flex items-center justify-between">
						<h1 className="text-xl uppercase italic font-bold text-primary">Dashboard</h1>
						<button className="text-secondary hover:text-white transition-colors hover:bg-secondary px-2 py-1 rounded-md">Sign out</button>
					</nav>
				</header>
				<main>
					The main content
				</main>
			</div>
		</>
	);
}

function Sidebar() {
	return (
		<aside className="fixed top-2 bottom-2 w-[14rem] p-2 rounded-tr-md rounded-br-md shadow-sm shadow-black">
			<Link to='..'>
				<Logo />
			</Link>
			<div className="mt-6 px-2 flex flex-col gap-4">
				<div>
					<span className="inline-block pb-1 uppercase text-sm italic font-semibold">Usuarios</span>
					<ul>
						<li className="hover:text-primary transition-colors w-fit">
							<Link to='./users'>Lista de usuarios</Link>
						</li>
						<li className="hover:text-primary transition-colors w-fit">
							<Link to='./users/create'>Crear un usuario</Link>
						</li>
					</ul>
				</div>
				<hr />
				<div>
					<span className="inline-block pb-1 uppercase text-sm italic font-semibold">Hoteles</span>
					<ul>
						<li className="hover:text-primary transition-colors w-fit">
							<Link to='./users'>Lista de hoteles</Link>
						</li>
						<li className="hover:text-primary transition-colors w-fit">
							<Link to='./users/create'>Crear un hotel</Link>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
}

export default AdminPage;