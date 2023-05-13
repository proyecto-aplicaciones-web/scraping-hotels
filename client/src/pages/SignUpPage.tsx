import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { Captcha, Logo } from 'components';
import CONFIG from 'config';
import { useSignUp } from 'hooks';
import { Link } from 'react-router-dom';

function SignUpPage() {
	const { formik, setCaptchaToken } = useSignUp();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={ {
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				} }
			>
				<Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
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
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link className="text-primary text-sm underline" to="/signin">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Link to='..' className='flex justify-center my-8'>
				<Logo />
			</Link>
		</Container>
	);
}

export default SignUpPage;