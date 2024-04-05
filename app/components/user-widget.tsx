import React from 'react';
import { useRouter } from 'next/router';
// @api
import { apiFunctions } from '@/pages/api';
// @types
import { IUserRead } from '@/store/types';
// @mui
import { Box, Typography, Divider, useTheme } from '@mui/material';
// @mui-icons
import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	X as XIcon,
	LinkedIn,
} from '@mui/icons-material';
// @components
import WidgetWrapper from '@/components/widget-wrapper';
import UserImage from '@/components/user-image';
import FlexBetween from '@/components/flex-between';

const UserWidget = ({
	userId,
	picturePath,
	refetch,
}: {
	userId: string;
	picturePath: string;
	refetch: boolean;
}) => {
	const [user, setUser] = React.useState<IUserRead | null>(null);

	React.useEffect(() => {
		if (userId) {
			const getUser = async () => {
				const res = await apiFunctions.getUser(userId as string);

				if (res.success) {
					const data = res.data;
					setUser(data);
				}
			};

			getUser();
		}
	}, [userId, refetch]);

	const router = useRouter();
	const theme = useTheme();

	const main = theme.palette.secondary.main;

	if (!user) {
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		impressions,
		viewedProfile,
		friends,
	} = user;

	return (
		<WidgetWrapper>
			<FlexBetween
				gap='0.5rem'
				pb='1.1rem'
				onClick={() => router.push(`/profile/${userId}`)}
			>
				<FlexBetween gap='1rem'>
					<UserImage image={picturePath} />

					<Box>
						<Typography
							variant='h4'
							color={theme.palette.secondary.dark}
							fontWeight='500'
							sx={{
								'&:hover': {
									cursor: 'pointer',
									color: main,
								},
							}}
						>
							{firstName} {lastName}
						</Typography>
						<Typography color={main}>
							{friends.length} friend/s
						</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>
			<Divider />
			<Box p='1rem 0'>
				<Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
					<LocationOnOutlined
						fontSize='large'
						sx={{
							color: main,
						}}
					/>
					<Typography color={main}>{location}</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap='1rem'>
					<WorkOutlineOutlined
						fontSize='large'
						sx={{
							color: main,
						}}
					/>
					<Typography color={main}>{occupation}</Typography>
				</Box>
			</Box>
			<Divider />

			<Box p='1rem 0'>
				<FlexBetween mb='0.5rem'>
					<Typography color={main}>
						Who&apos;s viewed your profile
					</Typography>
					<Typography color={main} fontWeight='500'>
						{viewedProfile}
					</Typography>
				</FlexBetween>
				<FlexBetween mb='0.5rem'>
					<Typography color={main}>
						Impressions of your post
					</Typography>
					<Typography color={main} fontWeight='500'>
						{impressions}
					</Typography>
				</FlexBetween>
			</Box>
			<Divider />

			<Box p='1rem 0'>
				<Typography
					fontSize='1rem'
					color={main}
					fontWeight='500'
					mb='1rem'
				>
					Social Profiles
				</Typography>
				<FlexBetween gap='1rem' mb='0.5rem'>
					<FlexBetween gap='1rem'>
						<XIcon
							sx={{
								color: main,
							}}
						/>
						<Box>
							<Typography color={main} fontWeight='500'>
								Twitter
							</Typography>
							<Typography color={main}>Social Network</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
				<FlexBetween gap='1rem'>
					<FlexBetween gap='1rem'>
						<LinkedIn
							sx={{
								color: main,
							}}
						/>
						<Box>
							<Typography color={main} fontWeight='500'>
								LinkedIn
							</Typography>
							<Typography color={main}>
								Network Platform
							</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
