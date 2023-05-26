import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { Captcha } from 'components';
import CONFIG from 'config';
import { useSignUp } from 'hooks';

function CreateUser() {
	const { formik, setCaptchaToken } = useSignUp();

	return (
		<Container component="div" maxWidth="md">
			<Box
				sx={ {
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				} }
			>
				<h3 className='text-primary text-2xl italic'>Create an user</h3>
				<Box component="form" noValidate onSubmit={ formik.handleSubmit } sx={ { mt: 3 } }>
					<Grid container spacing={ 2 }>
						<Grid item xs={ 12 }>
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
						<Grid item xs={ 12 }>
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
						<Grid item xs={ 12 }>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={ formik.values.email }
								onChange={ formik.handleChange }
								error={ formik.touched.email && Boolean(formik.errors.email) }
								helperText={ formik.touched.email && formik.errors.email }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								value={ formik.values.password }
								onChange={ formik.handleChange }
								error={ formik.touched.password && Boolean(formik.errors.password) }
								helperText={ formik.touched.password && formik.errors.password }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<Captcha siteKey={ CONFIG.GOOGLE_RECAPTCHA_SECRET_KEY } onChange={ setCaptchaToken } />
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

export default CreateUser;