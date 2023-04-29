import { AdminPage, MainPage, NotFoundPage, SignInPage, SignUpPage } from 'pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/admin",
		element: <AdminPage />,
	},
	{
		path: "/signin",
		element: <SignInPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

function Router() {
	return (
		<RouterProvider router={ router } />
	);
}

export default Router;