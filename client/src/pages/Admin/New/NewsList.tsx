import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ConfirmAction, Loader, Modal } from 'components';
import { notifyDeleting } from 'components/toast';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { useState } from 'react';
import { NewService } from 'services';
import { New } from 'types';
import EditNew from './EditNew';

function NewsList() {
	const queryClient = useQueryClient();

	const { data: news, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.NEWS_LIST],
		queryFn: () => NewService.getNewsList({})
	});

	const { isLoading: isDeleting, mutate: removeMutation } = useMutation({
		mutationFn: (id: number) => notifyDeleting(NewService.remove(id)),
		onSuccess: () => {
			queryClient.invalidateQueries([QUERY_KEYS.NEWS_LIST]);
			setConfirmModalInfo(null);
		}
	});

	const [selectedNew, setSelectedNew] = useState<New | null>(null);
	const [confirmModalInfo, setConfirmModalInfo] = useState<New | null>(null);

	const onEdit = (item: New) => setSelectedNew(item);

	const onDelete = async (id: number) => removeMutation(id);

	if (isLoading) return (
		<div className="w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-1rem)] flex items-center justify-center">
			<Loader text="Loading news" />
		</div>
	);

	return (
		<>
			<TableContainer component={ Paper } className="hover:overflow-auto" sx={ { overflow: "hidden" } }>
				<Table sx={ { minWidth: 650 } } aria-label="simple table">
					<TableHead sx={ { backgroundColor: "#ddd" } }>
						<TableRow>
							<TableCell align="center">ID</TableCell>
							<TableCell align="center">Title</TableCell>
							<TableCell align="center">Description</TableCell>
							<TableCell align="center">Image</TableCell>
							<TableCell align="center">Updated At</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ news?.map((item) => (
							<TableRow
								key={ item.id }
								sx={ {
									'&:last-child td, &:last-child th': { border: 0 },
									'&:nth-of-type(even)': { backgroundColor: '#eee' }
								} }
							>
								<TableCell align="center" component="th" scope="row">
									{ item.id }
								</TableCell>
								<TableCell align="center">{ item.title }</TableCell>
								<TableCell align="center">{ item.description }</TableCell>
								<TableCell align="center" width={ 128 }>
									<a target='_blank' href={ item.image }><img className="rounded-md" src={ item.image } alt={ item.title } /></a>
								</TableCell>
								<TableCell align="center">{ new Date(item.updatedAt).toLocaleString() }</TableCell>
								<TableCell align="center">
									<div className="flex items-center justify-around gap-2">
										<button onClick={ () => onEdit(item) }><EditRounded className='text-primary' /></button>
										<button onClick={ () => setConfirmModalInfo(item) }><DeleteRounded className="text-red-700" /></button>
									</div>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</TableContainer>
			{ selectedNew && <Modal isOpen={ !!selectedNew } onClose={ () => setSelectedNew(null) }>
				<EditNew item={ selectedNew } onClose={ () => setSelectedNew(null) } />
			</Modal> }
			{ !!confirmModalInfo && <Modal isOpen={ !!confirmModalInfo } onClose={ () => setConfirmModalInfo(null) }>
				<ConfirmAction title='Are you sure?' description='You are about to delete this new' disabled={ isDeleting } onCancel={ () => setConfirmModalInfo(null) } onConfirm={ () => onDelete(confirmModalInfo.id) } />
			</Modal> }
		</>
	);
}

export default NewsList;