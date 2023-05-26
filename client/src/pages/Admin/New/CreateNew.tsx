import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useFormik } from "formik";
import { New } from "types";
import * as Yup from 'yup';

function CreateNew() {
	const formik = useFormik<Partial<New>>({
		initialValues: {
			news_title: '',
			news_description: '',
			news_image: ''
		},
		validationSchema: Yup.object({
			news_title: Yup.string().required("Required"),
			news_description: Yup.string().required("Required"),
			news_image: Yup.string().required("Required")
		}),
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
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
								name="news_title"
								required
								fullWidth
								id="news_title"
								label="Title"
								autoFocus
								value={ formik.values.news_title }
								onChange={ formik.handleChange }
								error={ formik.touched.news_title && Boolean(formik.errors.news_title) }
								helperText={ formik.touched.news_title && formik.errors.news_title }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								required
								fullWidth
								multiline
								minRows={ 2 }
								id="news_description"
								label="Description"
								name="news_description"
								value={ formik.values.news_description }
								onChange={ formik.handleChange }
								error={ formik.touched.news_description && Boolean(formik.errors.news_description) }
								helperText={ formik.touched.news_description && formik.errors.news_description }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								required
								fullWidth
								id="news_image"
								label="Image"
								name="news_image"
								placeholder='https://images.unsplash.com/photo-1685094488656-9231107be07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
								autoComplete="image"
								value={ formik.values.news_image }
								onChange={ formik.handleChange }
								error={ formik.touched.news_image && Boolean(formik.errors.news_image) }
								helperText={ formik.touched.news_image && formik.errors.news_image }
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
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