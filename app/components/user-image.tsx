import React from 'react';
import Image from 'next/image';
// @mui
import { Box, Avatar } from '@mui/material';

const UserImage = ({ image, size = 60 }: { image: string; size?: number }) => {
	return (
		image && (
			<Box width={size}>
				<Avatar
					alt='user'
					src={image}
					sx={{
						height: size,
						width: size,
					}}
				/>
			</Box>
		)
	);
};

export default UserImage;
