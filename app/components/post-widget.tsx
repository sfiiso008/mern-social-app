import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
// @store
import { useStore, useDataStore } from '@/store/session';
// @mui
import { Box, Typography, IconButton, useTheme, Divider } from '@mui/material';
// @mui-icons
import {
	ChatBubbleOutline,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from '@mui/icons-material';
// @types
import { IPostRead } from '@/store/types';
// @local
import FlexBetween from './flex-between';
import WidgetWrapper from './widget-wrapper';
import Friend from './friend';

const PostWidget = ({
	post,
	setRefetch,
}: {
	post: IPostRead;
	setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { userId } = useStore(
		useShallow((state) => ({
			userId: state.user._id as string,
		}))
	);

	const { patchLikes } = useDataStore(
		useShallow((state) => ({
			patchLikes: state.patchLikes,
		}))
	);

	const theme = useTheme();

	const [isComments, setIsComments] = React.useState<boolean>(false);
	const likeCount = Object.keys(post.likes).length;
	const isLiked = post.likes.includes(userId);

	const primaryLight = theme.palette.primary.light;
	const main = theme.palette.secondary.main;

	const handleLike = async () => {
		const res = await patchLikes(post._id as string, userId);

		if (res.success) {
			setRefetch((prev) => !prev);
		}
	};

	return (
		<WidgetWrapper m='2rem 0'>
			<Friend
				friendId={post.userId as string}
				name={`${post.firstName} ${post.lastName}`}
				subTitle={post.location as string}
				userPicturePath={post.userPicturePath as string}
				setRefetch={setRefetch}
			/>
			<Typography color={main} sx={{ mt: '1rem' }}>
				{post.description}
			</Typography>
			{post.picturePath && (
				<Image
					priority
					src={post.picturePath}
					width={0}
					height={0}
					alt='post'
					sizes='100vw'
					style={{
						borderRadius: '0.75rem',
						marginTop: '0.75rem',
						width: '100%',
						height: 'auto',
					}}
				/>
			)}

			<FlexBetween mt='0.25rem'>
				<FlexBetween gap='1rem'>
					<FlexBetween gap='0.3rem'>
						<IconButton onClick={handleLike}>
							{isLiked ? (
								<FavoriteOutlined
									sx={{ color: primaryLight }}
								/>
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>
					<FlexBetween gap='0.3rem'>
						<IconButton
							onClick={() => setIsComments((prev) => !prev)}
						>
							<ChatBubbleOutline />
						</IconButton>
						<Typography>{post.comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>
				<IconButton>
					<ShareOutlined />
				</IconButton>
			</FlexBetween>
			{isComments && (
				<Box mt='0.5rem'>
					{post.comments.map((comment, index) => (
						<Box key={`${comment}-${index}`}>
							<Divider />
							<Typography
								sx={{
									color: main,
									m: '0.5rem 0',
									pl: '1rem',
								}}
							>
								{comment}
							</Typography>
						</Box>
					))}
					<Divider />
				</Box>
			)}
		</WidgetWrapper>
	);
};

export default PostWidget;
