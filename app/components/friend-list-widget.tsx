import React from 'react';
import { useShallow } from 'zustand/react/shallow';
// @store
import { useDataStore } from '@/store/session';
// @mui
import { Box, Typography, useTheme } from '@mui/material';
// @local
import Friend from './friend';
import WidgetWrapper from './widget-wrapper';

const FriendListWidget = ({
	userId,
	setRefetch,
}: {
	userId: string;
	setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const theme = useTheme();

	const { getFriends, friends } = useDataStore(
		useShallow((state) => ({
			getFriends: state.getFriends,
			friends: state.friends,
		}))
	);

	React.useEffect(() => {
		if (userId) {
			const handleGetFriends = async () => {
				await getFriends(userId);
			};

			handleGetFriends();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	return (
		<WidgetWrapper>
			<Typography
				color={theme.palette.secondary.dark}
				variant='h5'
				fontWeight='500'
				sx={{ mb: '1.5rem' }}
			>
				Friends List
			</Typography>
			{friends !== null && friends.length > 0 ? (
				<Box display='flex' flexDirection='column' gap='1.5rem'>
					{friends.map((friend) => (
						<Friend
							key={friend._id}
							friendId={friend._id as string}
							name={`${friend.firstName} ${friend.lastName}`}
							subTitle={friend.occupation as string}
							userPicturePath={friend.picturePath as string}
							setRefetch={setRefetch}
						/>
					))}
				</Box>
			) : null}
		</WidgetWrapper>
	);
};

export default FriendListWidget;
