/* eslint-disable unused-imports/no-unused-vars */
import { set } from 'react-hook-form';

export interface IUserRead {
	_id: string | null;
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	picturePath: string | null;
	location: string | null;
	occupation: string | null;
	friends: { _id: string }[] | [];
	impressions: number | 0;
	viewedProfile: number | 0;
}

export interface IPostRead {
	_id: string | null;
	userId: string | null;
	firstName: string | null;
	lastName: string | null;
	location?: string | null;
	description?: string | null;
	picturePath?: string | null;
	userPicturePath?: string | null;
	likes: string[];
	comments: string[] | [];
}

export type IUserSessionActions = {
	token: string | null;
	user: IUserRead;
};

export interface IPost {
	posts: IPostRead[];
	friends: IUserRead[];
}

export interface IDataActions {
	patchLikes: (
		postId: string,
		userId: string
	) => Promise<{
		success: boolean;
	}>;
	sendPost: (
		file: File | null,
		data: {
			description: string;
			userId: string;
		}
	) => Promise<{
		success: boolean;
	}>;
	getPosts: () => Promise<{
		success: boolean;
	}>;
	getUserPosts: ({ userId }: { userId: string }) => Promise<{
		success: boolean;
	}>;
	patchFriend: (
		userId: string,
		friendId: string
	) => Promise<{
		success: boolean;
	}>;
	getFriends: (userId: string) => Promise<{
		success: boolean;
	}>;
}

export interface IAuthActions {
	isAuthenticated: boolean;
	login: (payload: { email: string; password: string }) => Promise<{
		success: boolean;
		message: string | null;
	}>;
	logout: () => Promise<{
		success: boolean;
	}>;
}

export type TAuthStore = IUserSessionActions & IAuthActions;
export type TDataStore = IPost & IDataActions;
