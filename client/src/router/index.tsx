import { MainPage, SignInPage, SignUpPage } from 'pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/signin",
		element: <SignInPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
	},
]);

function Router() {
	return (
		<RouterProvider router={ router } />
	);
}

export default Router;