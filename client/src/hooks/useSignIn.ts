import { useMutation } from "@tanstack/react-query";
import { notifyLoginIn } from "components/toast";
import { useAuth } from "context/AuthContext";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "services";
import { User } from "types";
import * as Yup from 'yup';

function useSignIn() {
	const {setAuth} = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const mutation = useMutation({
		mutationFn: (data: Pick<User,'email'|'password'>) => notifyLoginIn(UserService.login(data)),
		onSuccess: async (auth) => {
			setAuth(auth);
			if(auth.role === 'admin') {
				navigate('/admin');
			} else {
				await new Promise(resolve => setTimeout(resolve,1000));
				navigate(location.state?.from ? location.state?.from : '/');
			}
		}
	});
	
	const formik = useFormik<Pick<User, 'email' | 'password'>>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(6, "Minimum lenght: 6 characters").required('Required'),
		}),
		onSubmit: data => mutation.mutate(data),
	});

	return {
		formik,
		mutation
	}
}

export default useSignIn;