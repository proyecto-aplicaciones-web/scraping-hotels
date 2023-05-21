import { Button } from "@mui/material";

interface ConfirmActionProps {
	title: string;
	description: string;
	onCancel: () => void;
	onConfirm: () => void;
}

function ConfirmAction({ title, description, onCancel, onConfirm }: ConfirmActionProps) {
	return (
		<div className="text-center space-y-4">
			<h4 className="text-2xl sm:text-3xl text-primary">{ title }</h4>
			<p className="sm:text-lg">{ description }</p>
			<div className="flex justify-center items-center gap-4">
				<Button variant="outlined" onClick={ onCancel }>Cancel</Button>
				<Button variant="contained" onClick={ onConfirm }>Accept</Button>
			</div>
		</div>
	);
}

export default ConfirmAction;