import { CheckRounded, CloseRounded, DeleteRounded, EditRounded } from '@mui/icons-material';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Captcha } from 'components';
import CONFIG from 'config';
import { QUERY_KEYS, queryClient } from 'config/tanstackQuery';
import { useFormik } from 'formik';
import { useState } from 'react';
import { UserService } from 'services';
import { User } from 'types';
import * as Yup from 'yup';

function UserList() {
	const { data: users, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.USER_LIST],
		queryFn: () => UserService.getUserList()
	});

	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const onEdit = (user: User) => {
		setSelectedUser(user);
	};

	const onDelete = async (id: number) => {
		await UserService.toggleUserStatus(id);
		queryClient.invalidateQueries([QUERY_KEYS.USER_LIST]);
	};

	if (isLoading) return 'Loading...';

	return (
		<>
			<TableContainer component={ Paper }>
				<Table sx={ { minWidth: 650 } } aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">ID</TableCell>
							<TableCell align="center">First Name</TableCell>
							<TableCell align="center">Last Name</TableCell>
							<TableCell align="center">Email</TableCell>
							<TableCell align="center">Role</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ users?.map((user) => (
							<TableRow
								key={ user.user_id }
								sx={ {
									'&:last-child td, &:last-child th': { border: 0 },
									'&:nth-of-type(odd)': { backgroundColor: 'lightgray' }
								} }
							>
								<TableCell align="center" component="th" scope="row">
									{ user.user_id }
								</TableCell>
								<TableCell align="center">{ user.first_name }</TableCell>
								<TableCell align="center">{ user.last_name }</TableCell>
								<TableCell align="center">{ user.email }</TableCell>
								<TableCell align="center">{ user.role }</TableCell>
								<TableCell align="center">{ user.state ? <CheckRounded className='text-teal-700' /> : <CloseRounded className='text-red-700' /> }</TableCell>
								<TableCell align="center">
									<div className="flex items-center justify-around gap-2">
										<button onClick={ () => onEdit(user) }><EditRounded className='text-primary' /></button>
										<button onClick={ () => onDelete(user.user_id) }><DeleteRounded className="text-red-700" /></button>
									</div>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</TableContainer>
			{ selectedUser && <EditUser user={ selectedUser } onCancel={ () => setSelectedUser(null) } /> }
		</>
	);
}

interface EditUserProps {
	user: User;
	onCancel: () => void;
}

function EditUser({ user, onCancel }: EditUserProps) {
	const formik = useFormik<Partial<User>>({
		initialValues: {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
		},
		validationSchema: Yup.object({
			first_name: Yup.string().required("Required"),
			last_name: Yup.string().required("Required"),
			email: Yup.string().email('Invalid email address').required('Required'),
		}),
		onSubmit: async values => {
			//TODO: Change api controller implementation
			// await UserService.updateUser(user.user_id);
		},
	});

	return <Box component="form" noValidate onSubmit={ formik.handleSubmit } sx={ { mt: 3 } }>
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
		</Grid>
		<div className="flex items-center gap-4">
			<Button
				onClick={ onCancel }
				fullWidth
				variant="contained"
				color="inherit"
				sx={ { mt: 3, mb: 2 } }
			>
				Cancel
			</Button>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={ { mt: 3, mb: 2 } }
			>
				Save
			</Button>
		</div>
	</Box>;
}

export default UserList;