interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	role: 'user' | 'admin';
	state: boolean;
}

export default User;