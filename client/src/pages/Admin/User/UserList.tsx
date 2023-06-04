import { CheckRounded, CloseRounded, DeleteRounded, EditRounded } from '@mui/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ConfirmAction, Modal } from 'components';
import { notifyDeleting } from 'components/toast';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { useState } from 'react';
import { UserService } from 'services';
import { User } from 'types';
import EditUser from './EditUser';
import { Link } from 'react-router-dom';

function UserList() {
	const queryClient = useQueryClient();

	const { data: users, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.USER_LIST],
		queryFn: () => UserService.getAll()
	});

	const { isLoading: isDeleting, mutate: removeMutation } = useMutation({
		mutationFn: (id: number) => notifyDeleting(UserService.toggleStatus(id)),
		onSuccess: () => {
			queryClient.invalidateQueries([QUERY_KEYS.USER_LIST]);
			setConfirmModalInfo(null);
		}
	});

	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [confirmModalInfo, setConfirmModalInfo] = useState<User | null>(null);

	const onEdit = (user: User) => setSelectedUser(user);

	const onDelete = async (id: number) => removeMutation(id);

	if (isLoading) return <span>Loading...</span>;

	return (
		<>
			<TableContainer component={ Paper } className="hover:overflow-auto" sx={ { overflow: "hidden" } }>
				<Table sx={ { minWidth: 650 } } aria-label="simple table">
					<TableHead sx={ { backgroundColor: "#eee" } }>
						<TableRow>
							<TableCell align="center">ID</TableCell>
							<TableCell align="center">First Name</TableCell>
							<TableCell align="center">Last Name</TableCell>
							<TableCell align="center">Email</TableCell>
							<TableCell align="center">Role</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Visited hotels</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ users?.map((user) => (
							<TableRow
								key={ user.id }
								sx={ {
									'&:last-child td, &:last-child th': { border: 0 },
									'&:nth-of-type(even)': { backgroundColor: '#eee' }
								} }
							>
								<TableCell align="center" component="th" scope="row">
									{ user.id }
								</TableCell>
								<TableCell align="center">{ user.first_name }</TableCell>
								<TableCell align="center">{ user.last_name }</TableCell>
								<TableCell align="center">{ user.email }</TableCell>
								<TableCell align="center">{ user.role }</TableCell>
								<TableCell align="center">{ user.state ? <CheckRounded className='text-teal-700' /> : <CloseRounded className='text-red-700' /> }</TableCell>
								<TableCell align="center">
									<Link to={ `./${user.id}/visited_rooms` } className='block text-primary underline'>Visited Hotels</Link>
								</TableCell>
								<TableCell align="center">
									<div className="flex items-center justify-around gap-2">
										<button onClick={ () => onEdit(user) }><EditRounded className='text-primary' /></button>
										<button onClick={ () => setConfirmModalInfo(user) }><DeleteRounded className="text-red-700" /></button>
									</div>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</TableContainer>
			{ selectedUser && <Modal isOpen={ !!selectedUser } onClose={ () => setSelectedUser(null) }>
				<EditUser user={ selectedUser } onClose={ () => setSelectedUser(null) } />
			</Modal> }
			{ !!confirmModalInfo && <Modal isOpen={ !!confirmModalInfo } onClose={ () => setConfirmModalInfo(null) }>
				<ConfirmAction title='Are you sure?' description='You are about to disable this user' disabled={ isDeleting } onCancel={ () => setConfirmModalInfo(null) } onConfirm={ () => onDelete(confirmModalInfo.id) } />
			</Modal> }
		</>
	);
}

export default UserList;