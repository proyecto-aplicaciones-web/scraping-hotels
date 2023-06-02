import { Button } from "@mui/material";

interface ConfirmActionProps {
	title: string;
	description: string;
	onCancel: () => void;
	onConfirm: () => void;
	disabled?: boolean;
}

function ConfirmAction({ title, description, onCancel, onConfirm, disabled }: ConfirmActionProps) {
	return (
		<div className="text-center space-y-4">
			<h4 className="text-xl sm:text-2xl text-primary">{ title }</h4>
			<p>{ description }</p>
			<div className="flex justify-center items-center gap-4">
				<Button variant="outlined" disabled={ disabled } onClick={ onCancel }>Cancel</Button>
				<Button variant="contained" disabled={ disabled } onClick={ onConfirm }>Accept</Button>
			</div>
		</div>
	);
}

export default ConfirmAction;