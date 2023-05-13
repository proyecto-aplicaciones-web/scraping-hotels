import { useFormik } from "formik";
import { User } from "types";
import * as Yup from 'yup';

function useSignIn() {
	const formik = useFormik<Pick<User, 'email'> & {password:string}>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(6, "Minimum lenght: 6 characters").required('Required'),
		}),
		onSubmit: values => {
			alert(JSON.stringify(values,null,2))
		},
	});

	return {
		formik
	}
}

export default useSignIn;