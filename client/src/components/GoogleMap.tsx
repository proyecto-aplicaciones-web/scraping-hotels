import { GoogleMap as GM, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import CONFIG from 'config';
import { memo } from 'react';

const position = {
	lat: 3.3986323874581386,
	lng: -76.52536161839977
};

function GoogleMap() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: CONFIG.GOOGLE_MAPS_KEY
	});

	if (!isLoaded) return null;

	return (
		<GM
			mapContainerStyle={ { width: '100%', height: '400px' } }
			center={ position }
			zoom={ 18 }
		>
			<MarkerF position={ { lat: position.lat, lng: position.lng } } />
		</GM>
	);
}

export default memo(GoogleMap);