import { StateCreator } from 'zustand/vanilla';
// @types
import { TAuthStore } from './types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createAuthStore = (): StateCreator<TAuthStore> => (set) => ({
	token: null,
	isAuthenticated: false,
	user: {
		_id: null,
		firstName: null,
		lastName: null,
		email: null,
		picturePath: null,
		location: null,
		occupation: null,
		friends: [],
		impressions: 0,
		viewedProfile: 0,
	},
	login: async (payload: { email: string; password: string }) => {
		try {
			const response = await fetch(`${baseUrl}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				const user = await response.json();

				set(() => ({
					isAuthenticated: true,
					user: user.result,
					token: user.token,
				}));
			}

			return { success: true, message: 'Login successful' };
		} catch (error) {
			return {
				success: false,
				message: 'Login failed. Please check your credentials.',
			};
		}
	},
	logout: async () => {
		try {
			set(() => ({
				token: null,
				user: {
					_id: null,
					firstName: null,
					lastName: null,
					email: null,
					picturePath: null,
					location: null,
					occupation: null,
					friends: [],
					impressions: 0,
					viewedProfile: 0,
				},
			}));

			return { success: true, message: 'Logout successful' };
		} catch (error) {
			console.error('Logout failed', error);
			return {
				success: false,
				message: 'Logout failed. An error occurred.',
			};
		}
	},
});

export default createAuthStore;
