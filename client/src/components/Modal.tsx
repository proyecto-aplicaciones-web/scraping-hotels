import { Backdrop, Box, Fade, Modal as MUIModal } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	onClose: () => void;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
	return ReactDOM.createPortal(
		<MUIModal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={ isOpen }
			onClose={ onClose }
			closeAfterTransition
			slots={ { backdrop: Backdrop } }
			slotProps={ {
				backdrop: {
					timeout: 500,
				},
			} }
		>
			<Fade in={ isOpen }>
				<Box className="rounded-lg" sx={ {
					position: 'absolute' as 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '90vw',
					maxWidth: "max-content",
					bgcolor: 'background.paper',
					boxShadow: 8,
					p: 4,
				} }>
					{ children }
				</Box>
			</Fade>
		</MUIModal>,
		document.getElementById('modal-root') as HTMLElement // Specify the modal container as the target
	);
}

export default Modal;