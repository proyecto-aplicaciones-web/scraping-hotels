import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { GoogleLogin, Logo } from 'components';
import { useSignIn } from 'hooks';
import { Link } from 'react-router-dom';

function SignInPage() {

	const { formik } = useSignIn();

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
					Sign in
				</Typography>
				<Box component="form" onSubmit={ formik.handleSubmit } noValidate sx={ { mt: 1 } }>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={ formik.values.email }
						onChange={ formik.handleChange }
						error={ formik.touched.email && Boolean(formik.errors.email) }
						helperText={ formik.touched.email && formik.errors.email }
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={ formik.values.password }
						onChange={ formik.handleChange }
						error={ formik.touched.password && Boolean(formik.errors.password) }
						helperText={ formik.touched.password && formik.errors.password }
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={ { mt: 3, mb: 2 } }
					>
						Sign In
					</Button>
					<Grid item xs={ 12 } className="text-sm text-center pb-4">
						<span>Don't have an account? </span>
						<Link className="text-primary" to="/signup">
							Sign Up
						</Link>
					</Grid>
					<Grid item className='or-divider' xs={ 12 }>
						<span className='text-xs px-2'>OR</span>
					</Grid>
					<Grid item xs={ 12 } className='text-center pt-4'>
						<GoogleLogin />
					</Grid>
				</Box>
			</Box>
			<Link to='..' className='flex justify-center my-8'>
				<Logo />
			</Link>
		</Container>
	);
}

export default SignInPage;