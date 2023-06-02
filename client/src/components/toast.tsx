import toast from "react-hot-toast";

export function notifyCreating<T>(request: Promise<T>): Promise<T> {
	return toast.promise(request, {
		loading: <span className="text-lg">Creating...</span>,
		success: <span className="text-lg">Created successfully</span>,
		error: <span className="text-lg">Could not be created</span>,
	});
}

export function notifyUpdating<T>(request: Promise<T>): Promise<T> {
	return toast.promise(request, {
		loading: <span className="text-lg">Updating...</span>,
		success: <span className="text-lg">Updated successfully</span>,
		error: <span className="text-lg">Could not be updated</span>,
	});
}

export function notifyDeleting<T>(request: Promise<T>): Promise<T> {
	return toast.promise(request, {
		loading: <span className="text-lg">Deleting...</span>,
		success: <span className="text-lg">Deleted successfully</span>,
		error: <span className="text-lg">Could not be deleted</span>,
	});
}

export function notifyLoginIn<T>(request: Promise<T>): Promise<T> {
	return toast.promise(request, {
		loading: <span className="text-lg">Loading...</span>,
		success: <span className="text-lg">Welcome back!</span>,
		error: <span className="text-lg">Oops! Invalid credentials</span>,
	});
}