import { MainLayout } from 'components';
import { AdminGuard, AuthGuard } from 'guards';
import { AdminLayout, CreateNew, CreateUser, Dashboard, MainPage, NewsList, NotFoundPage, RoomDetails, SignInPage, SignUpPage, UserList, VisitedHotels } from 'pages';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <MainPage />,
			}
		]
	},
	{
		path: "/rooms",
		element: <AuthGuard><Outlet /></AuthGuard>,
		children: [
			{
				index: true,
				element: <NotFoundPage />
			},
			{
				path: ":roomId",
				element: <RoomDetails />
			}
		]
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
					},
					{
						path: ":userId",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <NotFoundPage />
							},
							{
								path: 'visited_rooms',
								element: <VisitedHotels />
							}
						]
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