import { Box, Button, Grid, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyUpdating } from 'components/toast';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { useFormik } from 'formik';
import { UserService } from 'services';
import { New, User } from 'types';
import * as Yup from 'yup';

interface EditUserProps {
	user: User;
	onClose: () => void;
}

function EditUser({ user, onClose }: EditUserProps) {
	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation({
		mutationFn: (data: Partial<New>) => notifyUpdating(UserService.update(user.id, data)),
		onSuccess: () => {
			queryClient.invalidateQueries([QUERY_KEYS.USER_LIST]);
			onClose();
		}
	});

	const formik = useFormik<Partial<User>>({
		initialValues: {
			first_name: user.first_name,
			last_name: user.last_name,
		},
		validationSchema: Yup.object({
			first_name: Yup.string().required("Required"),
			last_name: Yup.string().required("Required"),
		}),
		onSubmit: data => mutate(data)
	});

	return (
		<div>
			<h4 className='text-primary text-xl font-semibold'>Editing user</h4>
			<Box component="form" noValidate onSubmit={ formik.handleSubmit } sx={ { mt: 3 } }>
				<Grid container spacing={ 2 }>
					<Grid item xs={ 12 } sm={ 6 }>
						<TextField
							autoComplete="given-name"
							name="first_name"
							required
							fullWidth
							id="first_name"
							label="First Name"
							autoFocus
							value={ formik.values.first_name }
							onChange={ formik.handleChange }
							error={ formik.touched.first_name && Boolean(formik.errors.first_name) }
							helperText={ formik.touched.first_name && formik.errors.first_name }
						/>
					</Grid>
					<Grid item xs={ 12 } sm={ 6 }>
						<TextField
							required
							fullWidth
							id="last_name"
							label="Last Name"
							name="last_name"
							autoComplete="family-name"
							value={ formik.values.last_name }
							onChange={ formik.handleChange }
							error={ formik.touched.last_name && Boolean(formik.errors.last_name) }
							helperText={ formik.touched.last_name && formik.errors.last_name }
						/>
					</Grid>
				</Grid>
				<div className="flex items-center justify-center sm:justify-end gap-4">
					<Button
						onClick={ onClose }
						variant="outlined"
						disabled={ isLoading }
						sx={ { mt: 3, mb: 2 } }
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={ isLoading }
						sx={ { mt: 3, mb: 2 } }
					>
						Save
					</Button>
				</div>
			</Box>
		</div>
	);
}

export default EditUser;