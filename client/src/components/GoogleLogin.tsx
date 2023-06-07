import CONFIG from 'config';
import { useSignIn } from 'hooks';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import { UserService } from 'services';
import { User } from 'types';

function GoogleLogin() {
	const { mutation } = useSignIn();

	const handleCallbackResponse = async (response: any) => {
		const decoded = jwt_decode(response.credential) as any;
		const user: Partial<User> = {
			email: decoded.email,
			first_name: decoded.given_name,
			last_name: decoded.family_name,
			password: CONFIG.SECRET_PASSWORD
		};
		await UserService.googleAuth(user);
		mutation.mutate({ email: user.email!, password: user.password! });
	};

	useEffect(() => {
		//@ts-ignore
		google.accounts.id.initialize({
			client_id: CONFIG.GOOGLE_AUTH_CLIENT_ID,
			callback: handleCallbackResponse
		});

		//@ts-ignore
		google.accounts.id.renderButton(
			document.getElementById('signInDiv'),
			{ theme: 'outline', size: 'large' }
		);
	}, []);

	return (
		<div id="signInDiv" className='w-fit mx-auto'></div>
	);
};

export default GoogleLogin;