interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	role: 'USER' | 'ADMIN';
	state: 'ACTIVE' | 'INACTIVE'
}

export default User;