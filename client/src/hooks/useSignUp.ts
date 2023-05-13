import { useFormik } from "formik";
import { useState } from "react";
import { User } from "types";
import * as Yup from 'yup';

function useSignUp() {
	const [captchaToken, setCaptchaToken] = useState<string | null>(null);
	
	const formik = useFormik<Partial<User> & {password:string}>({
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
		onSubmit: values => {
			if(captchaToken === null) {
				alert('Are you a robot? try again');
				return
			}
			alert(JSON.stringify(values,null,2))
		},
	});

	return {
		formik,
		captchaToken,
		setCaptchaToken
	}
}

export default useSignUp;