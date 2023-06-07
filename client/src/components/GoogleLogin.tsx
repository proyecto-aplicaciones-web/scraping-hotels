import CONFIG from 'config';
import axios from 'config/axios';
import GL, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

function GoogleLogin() {
	const handleGoogleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		if ('accessToken' in response && response?.accessToken) {
			// Envía el token de acceso a tu API de Django Rest Framework para la autenticación
			// Puedes utilizar axios u otra biblioteca para realizar la solicitud HTTP
			axios.post('/api/auth/google/', { access_token: response.accessToken })
				.then((response) => {
					console.log(response);

				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			// Maneja la respuesta fallida del inicio de sesión de Google
		}
	};

	const handleGoogleLoginFailure = (error: unknown) => {
		console.log('failure', { error });

	};

	return (
		<GL
			clientId={ CONFIG.GOOGLE_AUTH_CLIENT_ID }
			buttonText="Login with Google"
			onSuccess={ handleGoogleLoginSuccess }
			onFailure={ handleGoogleLoginFailure }
			cookiePolicy="single_host_origin"
		/>
	);
};

export default GoogleLogin;