import React from 'react';
import Dropzone from 'react-dropzone';
import { useShallow } from 'zustand/react/shallow';
// @store
import { useDataStore, useStore } from '@/store/session';
// @mui-icons
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	Button,
	IconButton,
	useMediaQuery,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @mui-icons
import {
	EditOutlined,
	GifBoxOutlined,
	DeleteOutline,
	AttachFileOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from '@mui/icons-material';
// @components
import UserImage from '@/components/user-image';
import WidgetWrapper from './widget-wrapper';
import FlexBetween from './flex-between';

const MyPostWidget = ({ picturePath }: { picturePath: string }) => {
	const { userId } = useStore(
		useShallow((state) => ({
			userId: state.user._id,
		}))
	);

	const { sendPost } = useDataStore(
		useShallow((state) => ({
			sendPost: state.sendPost,
		}))
	);

	const [isImage, setIsImage] = React.useState(false);
	const [image, setImage] = React.useState<File | null>(null);
	const [post, setPost] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const theme = useTheme();

	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const mediumMain = theme.palette.secondary.main;
	const medium = theme.palette.secondary.contrastText;

	const handlePost = async () => {
		setIsLoading(true);
		const result = await sendPost(image, {
			description: post,
			userId: userId as string,
		});

		setIsLoading(false);

		if (result.success) {
			setPost('');
			setImage(null);
			setIsImage(false);
		}
	};

	return (
		<WidgetWrapper>
			<FlexBetween gap='1.5rem'>
				<UserImage image={picturePath} />
				<InputBase
					placeholder='What is on your mind?'
					onChange={(e) => setPost(e.target.value)}
					value={post}
					sx={{
						width: '100%',
						backgroundColor: theme.palette.secondary.light,
						padding: '1rem 2rem',
						borderRadius: '2rem',
					}}
				/>
			</FlexBetween>
			{isImage && (
				<Box
					border={`1px solid ${medium}`}
					borderRadius={'5px'}
					mt='1rem'
					p='1rem'
				>
					<Dropzone
						accept={{
							'image/jpeg': ['.jpeg', '.png', '.jpg', '.webp'],
						}}
						multiple={false}
						onDrop={(acceptedFiles) => {
							setImage(acceptedFiles[0]);
						}}
					>
						{({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dahsed ${theme.palette.primary.light}`}
									sx={{
										'&:hover': {
											cursor: 'pointer',
										},
									}}
									width='100%'
								>
									<input {...getInputProps()} />
									{!image ? (
										<p>Add an image here</p>
									) : (
										<FlexBetween>
											<Typography>
												{image.name}{' '}
											</Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>
								{image && (
									<IconButton
										onClick={() => setImage(null)}
										sx={{
											width: '15%',
										}}
									>
										<DeleteOutline />
									</IconButton>
								)}
							</FlexBetween>
						)}
					</Dropzone>
				</Box>
			)}
			<Divider sx={{ margin: '1.25rem 0' }} />
			<FlexBetween>
				<FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
					<ImageOutlined
						sx={{
							color: mediumMain,
						}}
					/>
					<Typography
						color={mediumMain}
						sx={{
							'&:hover': {
								cursor: 'pointer',
								color: medium,
							},
						}}
					>
						Image
					</Typography>
				</FlexBetween>
				{isDesktop ? (
					<>
						<FlexBetween gap='0.25rem'>
							<GifBoxOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Clip</Typography>
						</FlexBetween>
						<FlexBetween gap='0.25rem'>
							<AttachFileOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>
								Attachment
							</Typography>
						</FlexBetween>
						<FlexBetween gap='0.25rem'>
							<MicOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Audio</Typography>
						</FlexBetween>
					</>
				) : (
					<FlexBetween gap='0.25rem'>
						<MoreHorizOutlined sx={{ color: mediumMain }} />
					</FlexBetween>
				)}

				<LoadingButton
					disabled={!post}
					onClick={handlePost}
					sx={{
						color: theme.palette.background.paper,
						backgroundColor: theme.palette.primary.main,
						borderRadius: '2rem',
					}}
					loading={isLoading}
				>
					Post
				</LoadingButton>
			</FlexBetween>
		</WidgetWrapper>
	);
};

export default MyPostWidget;
