import GL, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

function GoogleLogin() {
	const handleGoogleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		// send the Google access token to the Django backend for validation
		// and to retrieve the user information
	};

	const handleGoogleLoginFailure = (error: unknown) => {
		// handle the login failure
	};

	return (
		<GL
			clientId="your_client_id"
			buttonText="Login with Google"
			onSuccess={ handleGoogleLoginSuccess }
			onFailure={ handleGoogleLoginFailure }
			cookiePolicy={ 'single_host_origin' }
		/>
	);
};

export default GoogleLogin;