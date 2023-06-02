import User from "./User";

interface Auth extends User{
	token: string;
}

export default Auth;