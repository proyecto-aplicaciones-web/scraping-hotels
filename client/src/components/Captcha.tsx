import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface Props {
	siteKey: string;
	onChange: (token: string | null) => void;
}

const Captcha: React.FC<Props> = ({ siteKey, onChange }) => {
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const handleOnChange = async (token: string | null) => {
		onChange(token);
	};

	return (
		<ReCAPTCHA
			ref={ recaptchaRef }
			size="normal"
			sitekey={ siteKey }
			onChange={ handleOnChange }
		/>
	);
};

export default Captcha;