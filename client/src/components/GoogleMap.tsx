import { GoogleMap as GM, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import CONFIG from 'config';
import { memo, useEffect, useState } from 'react';

type Position = { lat: number, lng: number; };

interface GoogleMapProps {
	address: string;
}

function GoogleMap({ address }: GoogleMapProps) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: CONFIG.GOOGLE_MAPS_KEY
	});
	const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 });

	useEffect(() => {
		const getPosition = async () => {
			const position = await getAddressCoordinates(address);
			setPosition(position);
		};
		getPosition();
	}, []);

	if (!isLoaded) return null;

	return (
		<GM
			mapContainerStyle={ { width: '100%', height: '400px' } }
			center={ { lat: position.lat, lng: position.lng } }
			zoom={ 18 }
		>
			<MarkerF position={ { lat: position.lat, lng: position.lng } } />
		</GM>
	);
}

const getAddressCoordinates = async (address: string): Promise<Position> => {
	try {
		const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
			params: {
				address: address,
				key: CONFIG.GOOGLE_MAPS_KEY
			}
		});

		if (response.data.results.length > 0) {
			const { lat, lng } = response.data.results[0].geometry.location;
			return { lat, lng };
		} else {
			throw new Error('No coordinates found for the address');
		}
	} catch (error) {
		console.error('Error fetching coordinates:', error);
		throw error;
	}
};

export default memo(GoogleMap);