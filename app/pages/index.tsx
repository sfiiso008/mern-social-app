import React from 'react';
import { useShallow } from 'zustand/react/shallow';
// @store
import { useStore } from '@/store/session';
// @mui
import { Box, useMediaQuery } from '@mui/material';
// @components
import NavBar from '@/views/nav-bar';
import UserWidget from '@/components/user-widget';
import MyPostWidget from '@/components/my-post-widget';
import PostsWidget from '@/components/posts-widget';
import AdvertWidget from '@/components/advert-widget';
import FriendListWidget from '@/components/friend-list-widget';

const HomePage = () => {
	const isDesktop = useMediaQuery('(min-width:1000px)');
	const [refetch, setRefetch] = React.useState(false);

	const { user } = useStore(
		useShallow((state) => ({
			isAuthenticated: state.isAuthenticated,
			user: state.user,
		}))
	);

	return (
		<Box>
			<NavBar />
			<Box
				width='100%'
				padding='2rem 6%'
				display={isDesktop ? 'flex' : 'block'}
				gap='0.5rem'
				justifyContent='space-between'
			>
				<Box flexBasis={isDesktop ? '26%' : undefined}>
					{user && (
						<UserWidget
							userId={user._id as string}
							picturePath={user.picturePath as string}
							refetch={refetch}
						/>
					)}
				</Box>
				<Box
					flexBasis={isDesktop ? '42%' : undefined}
					mt={isDesktop ? undefined : '2rem'}
				>
					<MyPostWidget picturePath={user.picturePath as string} />
					<PostsWidget
						userId={user._id as string}
						refetch={refetch}
						setRefetch={setRefetch}
					/>
				</Box>
				{isDesktop && (
					<Box flexBasis='26%'>
						<AdvertWidget />
						<Box m='2rem 0' />
						<FriendListWidget
							userId={user._id as string}
							setRefetch={setRefetch}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default HomePage;
