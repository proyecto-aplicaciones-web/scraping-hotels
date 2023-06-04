import { useAuth } from 'context/AuthContext';
import { NotFoundPage } from 'pages';
import React from 'react';
interface AdminGuardProps extends React.HTMLAttributes<HTMLDivElement> { }

function AdminGuard({ children }: AdminGuardProps) {
	const { auth } = useAuth();

	if (auth?.role !== 'admin') return <NotFoundPage />;

	return <>{ children }</>;
}

export default AdminGuard;