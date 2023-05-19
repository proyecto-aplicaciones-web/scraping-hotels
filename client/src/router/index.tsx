import { AdminLayout, Dashboard, MainPage, NotFoundPage, SignInPage, SignUpPage, UserList } from 'pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: "users",
				element: <UserList />
			}
		]
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