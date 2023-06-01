const CONFIG = {
	GOOGLE_RECAPTCHA_SECRET_KEY: import.meta.env.VITE_GOOGLE_RECAPTCHA_SECRET_KEY as string,
	GOOGLE_MAPS_KEY: import.meta.env.VITE_GOOGLE_MAPS_KEY as string,
	API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
}

export default CONFIG;