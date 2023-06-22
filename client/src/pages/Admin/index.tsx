import { AdminPanelSettings, ArticleOutlined, CloseRounded, EditNoteOutlined, MenuRounded, PersonAddOutlined, PersonOutline } from '@mui/icons-material';
import { Logo } from "components";
import { useAuth } from 'context/AuthContext';
import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

	const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

	return (
		<>
			<Sidebar isOpen={ isSidebarOpen } onClose={ toggleSidebar } />
			<div className="min-h-screen" style={ {
				backgroundImage: "url(/admin-bg.svg)",
				backgroundSize: "cover"
			} }>
				<div className='md:ml-[14rem] p-2'>
					<div className='md:hidden mb-2'>
						<button onClick={ toggleSidebar }><MenuRounded className='text-primary' fontSize='medium' /></button>
					</div>
					<Outlet />
				</div>
			</div>
		</>
	);
}

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<aside className="bg-white fixed top-2 bottom-2 w-[14rem] p-2 rounded-tr-md rounded-br-md shadow-sm shadow-black z-50"
			style={ {
				left: isOpen ? 0 : "-100%",
				transition: "left .5s ease",
			} }>
			<div className='flex h-full flex-col justify-between'>
				<div className='flex-1'>
					<div className='flex justify-between items-center'>
						<Link to='..'>
							<Logo />
						</Link>
						<button className='block md:hidden' onClick={ onClose }><CloseRounded className='text-primary' fontSize='medium' /></button>
					</div>
					<NavLink to='/admin' className="block w-fit mt-4 mb-2 text-primary italic hover:scale-105 font-semibold transition-all rounded-md p-2 uppercase">
						Dashboard
					</NavLink>
					<div className="px-2 flex flex-col gap-4">
						<div>
							<span className="inline-block pb-1 uppercase text-sm italic font-semibold">Users</span>
							<ul className="leading-6">
								<SidebarLink to='./users' icon={ <PersonOutline fontSize="inherit" /> } text="Users" />
								<SidebarLink to='./users/create' icon={ <PersonAddOutlined fontSize="inherit" /> } text="Create users" />
							</ul>
						</div>
						<hr />
						<div>
							<span className="inline-block pb-1 uppercase text-sm italic font-semibold">News</span>
							<ul className="leading-6">
								<SidebarLink to='./news' icon={ <ArticleOutlined fontSize="inherit" /> } text="News" />
								<SidebarLink to='./news/create' icon={ <EditNoteOutlined fontSize="inherit" /> } text="Create news" />
							</ul>
						</div>
					</div>
				</div>
				<button className="flex justify-center items-center gap-2 text-secondary hover:text-white transition-colors hover:bg-secondary px-2 py-2 rounded-md" onClick={ onLogout }>
					<AdminPanelSettings />
					<span>Sign out</span>
				</button>
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