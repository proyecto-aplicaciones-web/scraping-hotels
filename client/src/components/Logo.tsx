interface Props extends Partial<HTMLDivElement> { }

function Logo(props: Props) {
	return (
		<div className={ `h-10 md:h-12 flex gap-2 items-center font-boogaloo text-lg text-xl md:text-2xl ${props.className}` }>
			<img className="h-full" src="/logo.svg" alt='scraping hotels logo' />
			<span>Scraping Hotels</span>
		</div>
	);
}

export default Logo;