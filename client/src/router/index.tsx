import { AdminGuard } from 'guards';
import { AdminLayout, CreateNew, CreateUser, Dashboard, MainPage, NewsList, NotFoundPage, SignInPage, SignUpPage, UserList } from 'pages';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/admin",
		element: <AdminGuard><AdminLayout /></AdminGuard>,
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: "users",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <UserList />,
					},
					{
						path: "create",
						element: <CreateUser />
					}
				]
			},
			{
				path: "news",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <NewsList />,
					},
					{
						path: "create",
						element: <CreateNew />
					}
				]
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