import { ArrowBackRounded } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { RoomList } from 'components';
import { QUERY_KEYS } from 'config/tanstackQuery';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams, } from 'react-router-dom';

function SearchRooms() {
	const [params, setParams] = useSearchParams();
	const navigate = useNavigate();
	const searchRef = useRef<HTMLInputElement>(null);

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setParams(prev => {
			prev.set('q', e.target.value);
			return prev;
		});
	};

	useEffect(() => {
		searchRef!.current!.value = params.get('q') ?? '';
	}, []);

	const debounceOnSearchChange = debounce(onSearchChange, 500);

	const goBack = () => navigate(-1);

	return (
		<main className='relative'>
			<div className='px-4 flex items-center gap-4 sticky top-0 md:px-16 py-4 bg-white z-50 shadow shadow-black/20'>
				<button className="text-primary hover:scale-110 transition-transform" onClick={ goBack }>
					<ArrowBackRounded />
				</button>
				<form onSubmit={ (e) => e.preventDefault() } autoComplete="off" className="w-full flex gap-2">
					<input autoFocus ref={ searchRef } className="w-full border p-4 rounded-lg focus:outline -outline-offset-1 outline-primary" placeholder="Search ..." onChange={ debounceOnSearchChange } type="text" />
					<FormControl className='w-32'>
						<InputLabel id="demo-simple-select-label">Price</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={ params.get('order')! }
							label="Order"
							onChange={ (e) => setParams(prev => {
								prev.set('order', e.target.value);
								return prev;
							}) }
						>
							<MenuItem value="">None</MenuItem>
							<MenuItem value="price">Ascending</MenuItem>
							<MenuItem value="-price">Descending</MenuItem>
						</Select>
					</FormControl>
				</form>
				<Link to="/">
					<div className='h-10 sm:h-12'>
						<img className="h-full" src="/logo.svg" alt='scraping hotels logo' />
					</div>
				</Link>
			</div>
			<div className="mt-4 mx-2 md:mx-12 pb-4">
				<RoomList query_key={ QUERY_KEYS.ROOM_SEARCH_LIST } params={ {
					q: params.get('q') ?? '',
					order: params.get('order') ?? ''
				} } />
			</div>
		</main>
	);
}

export default SearchRooms;