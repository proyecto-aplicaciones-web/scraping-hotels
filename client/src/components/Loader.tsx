import { PuffLoader } from "react-spinners";

interface LoaderProps {
	text?: string;
}

function Loader({ text }: LoaderProps) {
	return (
		<div className="flex items-center justify-center gap-2">
			<PuffLoader size={ 30 } />
			{ text && <span>{ text }</span> }
		</div>
	);
}

export default Loader;