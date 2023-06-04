import { useAuth } from 'context/AuthContext';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
interface AuthGuardProps extends React.HTMLAttributes<HTMLDivElement> { }

function AuthGuard({ children }: AuthGuardProps) {
	const { auth } = useAuth();
	const { pathname } = useLocation();

	useEffect(() => {
		if (auth) return;
		toast.error('You need to authenticate first');
	}, []);

	if (!auth) {
		return <Navigate to="/signin" state={ { from: pathname } } />;
	}

	return <>{ children }</>;
}

export default AuthGuard;