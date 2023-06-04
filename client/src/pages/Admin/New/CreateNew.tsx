import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifyCreating } from 'components/toast';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { useFormik } from "formik";
import { NewService } from 'services';
import { New } from "types";
import * as Yup from 'yup';

function CreateNew() {
	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation({
		mutationFn: (data: Partial<New>) => notifyCreating(NewService.create(data)),
		onSuccess: () => {
			queryClient.invalidateQueries([QUERY_KEYS.NEWS_LIST]);
			formik.resetForm();
		}
	});

	const formik = useFormik<Partial<New>>({
		initialValues: {
			title: '',
			description: '',
			image: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Required"),
			description: Yup.string().required("Required"),
			image: Yup.string().matches(new RegExp('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'), 'Enter a valid URL').required("Required")
		}),
		onSubmit: data => mutate(data)
	});

	return (
		<Container component="div" maxWidth="md">
			<Box
				sx={ {
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				} }
			>
				<h3 className='text-primary text-2xl italic'>Create a new</h3>
				<Box component="form" noValidate onSubmit={ formik.handleSubmit } sx={ { mt: 3 } }>
					<Grid container spacing={ 2 }>
						<Grid item xs={ 12 }>
							<TextField
								name="title"
								required
								fullWidth
								id="title"
								label="Title"
								autoFocus
								value={ formik.values.title }
								onChange={ formik.handleChange }
								error={ formik.touched.title && Boolean(formik.errors.title) }
								helperText={ formik.touched.title && formik.errors.title }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								required
								fullWidth
								multiline
								minRows={ 2 }
								id="description"
								label="Description"
								name="description"
								value={ formik.values.description }
								onChange={ formik.handleChange }
								error={ formik.touched.description && Boolean(formik.errors.description) }
								helperText={ formik.touched.description && formik.errors.description }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								required
								fullWidth
								id="image"
								label="Image"
								name="image"
								placeholder='https://images.unsplash.com/photo-1685094488656-9231107be07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
								autoComplete="image"
								value={ formik.values.image }
								onChange={ formik.handleChange }
								error={ formik.touched.image && Boolean(formik.errors.image) }
								helperText={ formik.touched.image && formik.errors.image }
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						disabled={ isLoading }
						fullWidth
						variant="contained"
						sx={ { mt: 3, mb: 2 } }
					>
						Create
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default CreateNew;