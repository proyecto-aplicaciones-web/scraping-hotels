import { useUtils } from "context/UtilsContext";
import moment from "moment";
import { useLayoutEffect } from "react";

function MakeScraping() {
	const { makeScraping, isScrapingAvailable, setIsScrapingAvailable } = useUtils();

	useLayoutEffect(() => {
		const lastUpdate: moment.Moment = moment(JSON.parse(localStorage.getItem('lastScrapingUpdate')!));
		if (!lastUpdate.isValid()) {
			setIsScrapingAvailable(true);
			return;
		};
		const today: moment.Moment = moment();
		if (!today.isAfter(lastUpdate, 'day')) return;
		setIsScrapingAvailable(true);
	}, []);

	if (!isScrapingAvailable) return <span className="text-gray-500 text-sm">Wait until tomorrow for getting rooms</span>;

	return (
		<button
			className="rounded-full bg-primary border border-primary text-white px-4 py-2 animate-bounce hover:bg-transparent hover:text-primary transition-colors"
			disabled={ makeScraping.isLoading }
			onClick={ () => makeScraping.mutate() }
		>
			Get rooms
		</button>
	);
}

export default MakeScraping;