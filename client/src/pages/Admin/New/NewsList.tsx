import { DeleteRounded } from '@mui/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ConfirmAction, Modal } from 'components';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { useState } from 'react';
import { NewService } from 'services';
import { New } from 'types';

// const news: New[] = [
// 	{
// 		id: 1, title: "new 1", description: "description 1", image: "https://images.unsplash.com/photo-1685094488656-9231107be07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", date: new Date()
// 	}
// ];

function NewsList() {
	const { data: news, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.NEWS_LIST],
		queryFn: () => NewService.getNewsList()
	});

	const [confirmModalInfo, setConfirmModalInfo] = useState<New | null>(null);

	const onDelete = async (id: number) => {
		// await NewService.toggleUserStatus(id);
		// queryClient.invalidateQueries([QUERY_KEYS.USER_LIST]);
		// setConfirmModalInfo(null);
	};

	if (isLoading) return <span>Loading...</span>;

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
							<TableCell align="center">Date</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ news?.map((item) => (
							<TableRow
								key={ item.news_id }
								sx={ {
									'&:last-child td, &:last-child th': { border: 0 },
									'&:nth-of-type(even)': { backgroundColor: '#eee' }
								} }
							>
								<TableCell align="center" component="th" scope="row">
									{ item.news_id }
								</TableCell>
								<TableCell align="center">{ item.news_title }</TableCell>
								<TableCell align="center">{ item.news_description }</TableCell>
								<TableCell align="center" width={ 128 }>
									<a target='_blank' href={ item.news_image }><img className="rounded-md" src={ item.news_image } alt={ item.news_title } /></a>
								</TableCell>
								<TableCell align="center">{ item.news_date }</TableCell>
								<TableCell align="center">
									<div className="flex items-center justify-around gap-2">
										<button onClick={ () => setConfirmModalInfo(item) }><DeleteRounded className="text-red-700" /></button>
									</div>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</TableContainer>
			{ !!confirmModalInfo && <Modal isOpen={ !!confirmModalInfo } onClose={ () => setConfirmModalInfo(null) }>
				<ConfirmAction title='Are you sure?' description='You are about to disable this new' onCancel={ () => setConfirmModalInfo(null) } onConfirm={ () => onDelete(confirmModalInfo.news_id) } />
			</Modal> }
		</>
	);
}

export default NewsList;