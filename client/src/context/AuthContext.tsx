import { useLocalStorage } from "hooks";
import React from "react";
import { toast } from "react-hot-toast";
import { Auth } from "types";

interface Props {
	children: JSX.Element | JSX.Element[];
}
interface IAuthContext {
	auth: Auth | null;
	setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
	logout: () => void;
}

const AuthContext = React.createContext<IAuthContext>({
	auth: null,
} as IAuthContext);

export const AuthProvider = ({ children }: Props): JSX.Element => {
	const [auth, setAuth] = useLocalStorage<Auth | null>("auth");

	const logout = () => {
		setAuth(null);
		toast.success(<span className="text-lg">Bye bye!</span>);
	};

	return (
		<AuthContext.Provider value={ { auth, setAuth, logout } }>
			{ children }
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};