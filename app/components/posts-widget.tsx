import React from 'react';
import { useShallow } from 'zustand/react/shallow';
// @store
import { useDataStore } from '@/store/session';
// @components
import PostWidget from '@/components/post-widget';
import { Typography } from '@mui/material';
import { ref } from 'yup';

const PostsWidget = ({
	userId,
	isProfile = false,
	refetch,
	setRefetch,
}: {
	userId: string;
	isProfile?: boolean;
	refetch: boolean;
	setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { getPosts, getUserPosts, posts } = useDataStore(
		useShallow((state) => ({
			posts: state.posts,
			getPosts: state.getPosts,
			getUserPosts: state.getUserPosts,
		}))
	);

	React.useEffect(() => {
		const getAllPosts = async () => {
			if (isProfile) {
				await getUserPosts({ userId });
			} else {
				await getPosts();
			}
		};

		getAllPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isProfile, userId, refetch]);

	if (posts.length === 0) {
		return (
			<Typography sx={{ mt: '5rem' }} textAlign='center' variant='h4'>
				No Posts
			</Typography>
		);
	}

	return (
		<>
			{posts.length > 0 &&
				posts.map((post) => (
					<PostWidget
						key={post._id}
						post={post}
						setRefetch={setRefetch}
					/>
				))}
		</>
	);
};

export default PostsWidget;
