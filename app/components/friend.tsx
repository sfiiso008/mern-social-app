import React from 'react';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
// @store
import { useDataStore, useStore } from '@/store/session';
// @mui
import { Box, Typography, IconButton, useTheme } from '@mui/material';
// @mui-icons
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
// @local
import FlexBetween from './flex-between';
import UserImage from './user-image';
import { apiFunctions } from '@/pages/api';

const Friend = ({
	friendId,
	name,
	subTitle,
	userPicturePath,
	setRefetch,
}: {
	friendId: string;
	name: string;
	subTitle: string;
	userPicturePath: string;
	setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { userId } = useStore(
		useShallow((state) => ({
			userId: state.user._id as string,
		}))
	);

	const { friends, patchFriend } = useDataStore(
		useShallow((state) => ({
			friends: state.friends,
			patchFriend: state.patchFriend,
		}))
	);

	const router = useRouter();
	const theme = useTheme();

	const primaryLight = theme.palette.primary.light;
	const primaryDark = theme.palette.primary.dark;
	const main = theme.palette.secondary.main;
	const medium = theme.palette.secondary.light;

	const isFriend = friends.find((friend) => friend._id === friendId);

	const handleFriend = async () => {
		const res = await patchFriend(userId, friendId);

		if (res.success) {
			setRefetch((prev) => !prev);
		}
	};

	return (
		<FlexBetween>
			<FlexBetween gap='1rem'>
				<UserImage image={userPicturePath} size={55} />
				<Box onClick={() => router.push(`/profile/${friendId}`)}>
					<Typography
						variant='h5'
						color={main}
						fontWeight='500'
						sx={{
							'&:hover': {
								color: primaryLight,
								cursor: 'pointer',
							},
						}}
					>
						{name}
					</Typography>
					<Typography
						variant='body2'
						color={medium}
						fontSize='0.75rem'
					>
						{subTitle}
					</Typography>
				</Box>
			</FlexBetween>
			{friendId !== userId && (
				<IconButton
					onClick={handleFriend}
					sx={{
						p: '0.6rem',
						backgroundColor: primaryLight,
					}}
				>
					{isFriend ? (
						<PersonRemoveOutlined
							sx={{
								color: primaryDark,
							}}
						/>
					) : (
						<PersonAddOutlined
							sx={{
								color: primaryDark,
							}}
						/>
					)}
				</IconButton>
			)}
		</FlexBetween>
	);
};

export default Friend;
