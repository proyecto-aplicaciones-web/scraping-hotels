interface Props extends Partial<HTMLDivElement> { }

function Logo(props: Props) {
	return (
		<div className={ `h-10 sm:h-12 flex gap-2 items-center font-boogaloo text-lg sm:text-2xl ${props.className}` }>
			<img className="h-full" src="/logo.svg" alt='scraping hotels logo' />
			<span>Scraping Hotels</span>
		</div>
	);
}

export default Logo;