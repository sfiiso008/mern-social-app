const IS_BROWSER = typeof window !== 'undefined';
const IS_LOCAL_STORAGE_AVAILABLE = typeof localStorage !== 'undefined';

const store =
	IS_BROWSER && IS_LOCAL_STORAGE_AVAILABLE
		? JSON.parse(localStorage.getItem('store') as string)
		: null;

const token = store ? store.token : null;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const uploadFile = async (data: { file: File }) => {
	try {
		const formData = new FormData();
		formData.append('file', data.file);

		const response = await fetch(`${baseUrl}/upload`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Something went wrong...');
		}

		const result = await response.json();

		return {
			message: result.message,
			url: result.url,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: error.message,
				url: null,
			};
		}
		return {
			message: 'An error occurred...',
			url: null,
		};
	}
};

const register = async (
	file: File,
	data: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
		location: string;
		occupation: string;
	}
) => {
	try {
		const uploadResult = await uploadFile({
			file,
		});

		if (!uploadResult || !uploadResult.url) {
			throw new Error('Upload failed');
		}

		const { url } = uploadResult;

		const response = await fetch(`${baseUrl}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...data, picturePath: url }),
		});

		if (!response.ok) {
			throw new Error('Something went wrong...');
		}

		return {
			success: true,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
			};
		}
		return {
			success: false,
		};
	}
};

const getUsers = async () => {
	try {
		const response = await fetch(`${baseUrl}/users`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Something went wrong...');
		}

		const result = await response.json();

		return {
			success: true,
			data: result,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				data: null,
			};
		}
		return {
			success: false,
			data: null,
		};
	}
};

const getUser = async (userId: string) => {
	try {
		const response = await fetch(`${baseUrl}/users/${userId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error('Something went wrong...');
		}

		const result = await response.json();

		return {
			success: true,
			data: result,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				data: null,
			};
		}
		return {
			success: false,
			data: null,
		};
	}
};

const getFriends = async (userId: string) => {
	try {
		const response = await fetch(`${baseUrl}/users/${userId}/friends`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const result = await response.json();

		return {
			data: result,
			success: true,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				data: null,
			};
		}
		return {
			success: false,
			data: null,
		};
	}
};

export const apiFunctions = {
	register,
	getFriends,
	getUser,
	uploadFile,
	getUsers,
};
