import { ArticleOutlined, CloseRounded, EditNoteOutlined, MenuRounded, PersonAddOutlined, PersonOutline } from '@mui/icons-material';
import { Logo } from "components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

	const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

	return (
		<>
			<Sidebar isOpen={ isSidebarOpen } onClose={ toggleSidebar } />
			<div className="md:ml-[14rem] p-2">
				<header>
					<nav className="flex items-center justify-between">
						<div className='flex gap-2'>
							<button className='block md:hidden' onClick={ toggleSidebar }><MenuRounded className='text-primary' fontSize='medium' /></button>
							<h1 className="text-xl uppercase italic font-bold text-primary">Dashboard</h1>
						</div>
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

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
	return (
		<aside className="bg-white fixed top-2 bottom-2 w-[14rem] p-2 rounded-tr-md rounded-br-md shadow-sm shadow-black z-50"
			style={ {
				left: isOpen ? 0 : "-100%",
				transition: "left .5s ease",
			} }>
			<div className='flex justify-between items-center'>
				<Link to='..'>
					<Logo />
				</Link>
				<button className='block md:hidden' onClick={ onClose }><CloseRounded className='text-primary' fontSize='medium' /></button>
			</div>
			<div className="mt-6 px-2 flex flex-col gap-4">
				<div>
					<span className="inline-block pb-1 uppercase text-sm italic font-semibold">Users</span>
					<ul className="leading-6">
						<SidebarLink to='./users' icon={ <PersonOutline fontSize="inherit" /> } text="Users List" />
						<SidebarLink to='./users/create' icon={ <PersonAddOutlined fontSize="inherit" /> } text="Create an user" />
					</ul>
				</div>
				<hr />
				<div>
					<span className="inline-block pb-1 uppercase text-sm italic font-semibold">News</span>
					<ul className="leading-6">
						<SidebarLink to='./news' icon={ <ArticleOutlined fontSize="inherit" /> } text="News List" />
						<SidebarLink to='./news/create' icon={ <EditNoteOutlined fontSize="inherit" /> } text="Create news" />
					</ul>
				</div>
			</div>
			<div className="mt-6">
				<span className="inline-block text-lg text-primary font-semibold ml-2 mb-1">Reports</span>
				<ul className="space-y-1">
					<Link to='./report-one'>
						<li className="hover:bg-primary/40 transition-colors rounded-md p-2">
							Report one
						</li>
					</Link>
					<Link to='./report-two'>
						<li className="hover:bg-primary/40 transition-colors rounded-md p-2">
							Report two
						</li>
					</Link>
				</ul>
			</div>
		</aside>
	);
}

interface SidebarLinkProps {
	to: string;
	icon: React.ReactNode;
	text: string;
}

function SidebarLink({ to, icon, text }: SidebarLinkProps) {
	return (
		<li className="hover:text-primary transition-colors w-fit">
			<Link to={ to } className='flex items-center gap-1'>{ icon }<span>{ text }</span></Link>
		</li>
	);
}

export default AdminPage;