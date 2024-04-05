import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next/types';
// @api
import { apiFunctions } from '@/pages/api';
// @types
import { IUserRead } from '@/store/types';
// @mui
import { Box, useMediaQuery } from '@mui/material';
// @components
import NavBar from '@/views/nav-bar';
import UserWidget from '@/components/user-widget';
import MyPostWidget from '@/components/my-post-widget';
import PostsWidget from '@/components/posts-widget';
import FriendListWidget from '@/components/friend-list-widget';

const Profile = ({ user }: { user: IUserRead }) => {
	const isDesktop = useMediaQuery('(min-width:1000px)');

	return (
		<Box>
			<NavBar />
			<Box
				width='100%'
				padding='2rem 6%'
				display={isDesktop ? 'flex' : 'block'}
				gap='2rem'
				justifyContent='center'
			>
				<Box flexBasis={isDesktop ? '26%' : undefined}>
					{user && (
						<UserWidget
							userId={user._id as string}
							picturePath={user.picturePath as string}
						/>
					)}
					<Box m='2rem 0' />
					<FriendListWidget userId={user?._id as string} />
				</Box>
				<Box
					flexBasis={isDesktop ? '42%' : undefined}
					mt={isDesktop ? undefined : '2rem'}
				>
					<MyPostWidget picturePath={user?.picturePath as string} />
					<Box m='2rem 0' />
					<PostsWidget userId={user?._id as string} isProfile />
				</Box>
			</Box>
		</Box>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const userId = params?.userId as string;

	const user = await apiFunctions.getUser(userId);

	return {
		props: {
			user: user?.data,
		},
		revalidate: 600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const result = await apiFunctions.getUsers();

	const users = result.data;

	const paths = users?.map((user: IUserRead) => ({
		params: { userId: user._id },
	}));

	return {
		paths: paths || [],
		fallback: false,
	};
};

export default Profile;
