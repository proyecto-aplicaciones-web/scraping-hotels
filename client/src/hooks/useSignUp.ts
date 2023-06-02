import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { User } from "types";
import * as Yup from 'yup';

interface UseSignUpProps {
	onSubmit: (user: Partial<User>) => void;
}

function useSignUp({onSubmit}: UseSignUpProps) {
	const [captchaToken, setCaptchaToken] = useState<string | null>(null);
	
	const formik = useFormik<Partial<User>>({
		initialValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			first_name: Yup.string().required("Required"),
			last_name: Yup.string().required("Required"),
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(6, "Minimum lenght: 6 characters").required('Required'),
		}),
		onSubmit: data => {
			if(captchaToken === null) {
				toast.error('Are you a robot?');
				return;
			}
			onSubmit(data);
		},
	});

	return {
		formik,
		captchaToken,
		setCaptchaToken
	}
}

export default useSignUp;