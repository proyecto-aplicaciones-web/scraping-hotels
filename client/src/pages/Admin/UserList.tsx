import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { UserService } from 'services';

function UserList() {
	const { data: users, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.USER_LIST],
		queryFn: () => UserService.getUserList()
	});

	if (isLoading) return 'Loading...';

	return (
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
					</TableRow>
				</TableHead>
				<TableBody>
					{ users?.map((user) => (
						<TableRow
							key={ user.user_id }
							sx={ {
								'&:last-child td, &:last-child th': { border: 0 },
								'&:nth-child(odd)': { backgroundColor: 'lightgray' }
							} }
						>
							<TableCell align="center" component="th" scope="row">
								{ user.user_id }
							</TableCell>
							<TableCell align="center">{ user.first_name }</TableCell>
							<TableCell align="center">{ user.last_name }</TableCell>
							<TableCell align="center">{ user.email }</TableCell>
							<TableCell align="center">{ user.role }</TableCell>
							<TableCell align="center">{ user.state ? 'active' : 'inactive' }</TableCell>
						</TableRow>
					)) }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default UserList;