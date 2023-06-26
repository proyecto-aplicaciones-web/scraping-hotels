import { RoomService } from "services";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface Props {
	children: JSX.Element | JSX.Element[];
}
interface IUtilsContext {
	makeScraping: UseMutationResult<any, unknown, void, unknown>;
	isScrapingAvailable: boolean;
	setIsScrapingAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

const UtilsContext = React.createContext<IUtilsContext>({
	makeScraping: {},
	isScrapingAvailable: false,
} as IUtilsContext);

export const UtilsProvider = ({ children }: Props): JSX.Element => {
	const [isScrapingAvailable, setIsScrapingAvailable] = useState<boolean>(false);
	const mutation = useMutation({
		mutationFn: () => RoomService.makeScraping(),
		onSuccess: () => {
			localStorage.setItem('lastScrapingUpdate', JSON.stringify(new Date()));
			setIsScrapingAvailable(false);
		}
	});

	return (
		<UtilsContext.Provider value={ { makeScraping: mutation, isScrapingAvailable, setIsScrapingAvailable } }>
			{ children }
		</UtilsContext.Provider>
	);
};

export const useUtils = () => {
	return React.useContext(UtilsContext);
};