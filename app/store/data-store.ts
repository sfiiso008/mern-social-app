import { StateCreator } from 'zustand/vanilla';
// @types
import { TDataStore } from './types';
import { apiFunctions } from '@/pages/api';

const IS_BROWSER = typeof window !== 'undefined';
const IS_LOCAL_STORAGE_AVAILABLE = typeof localStorage !== 'undefined';

const store =
	IS_BROWSER && IS_LOCAL_STORAGE_AVAILABLE
		? JSON.parse(localStorage.getItem('store') as string)
		: null;

const token = store ? store.token : null;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDataStore = (): StateCreator<TDataStore> => (set) => ({
	posts: [],
	friends: [],
	getUserPosts: async ({ userId }: { userId: string }) => {
		try {
			const response = await fetch(`${baseUrl}/posts/${userId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const result = await response.json();

			set((state) => ({
				...state,
				posts: result,
			}));

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
	},
	getPosts: async () => {
		try {
			const response = await fetch(`${baseUrl}/posts`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const result = await response.json();

			set((state) => ({
				...state,
				posts: result,
			}));

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
	},
	sendPost: async (
		file: File | null,
		data: { description: string; userId: string }
	) => {
		try {
			let url = null;

			if (file) {
				const uploadResult = await apiFunctions.uploadFile({
					file,
				});

				if (!uploadResult || !uploadResult.url) {
					throw new Error('Upload failed');
				}

				url = uploadResult.url;
			}

			const response = await fetch(`${baseUrl}/posts`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...data, picturePath: url }),
			});

			if (!response.ok) {
				throw new Error('Something went wrong...');
			}

			const result = await response.json();

			set((state) => ({
				...state,
				posts: result,
			}));

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
	},
	patchLikes: async (postId: string, userId: string) => {
		try {
			await fetch(`${baseUrl}/posts/${postId}/like`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId }),
			});

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
	},
	getFriends: async (userId: string) => {
		try {
			const response = await fetch(`${baseUrl}/users/${userId}/friends`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const result = await response.json();

			set((state) => ({
				...state,
				friends: result,
			}));

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
	},
	patchFriend: async (userId: string, friendId: string) => {
		try {
			const response = await fetch(
				`${baseUrl}/users/${userId}/${friendId}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Something went wrong...');
			}

			const result = await response.json();

			set((state) => ({
				...state,
				friends: result,
			}));

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
	},
});

export default createDataStore;
