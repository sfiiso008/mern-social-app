import React from 'react';
import Image from 'next/image';
// @mui
import { Typography, useTheme } from '@mui/material';
// @local
import WidgetWrapper from './widget-wrapper';
import FlexBetween from './flex-between';

const AdvertWidget = () => {
	const theme = useTheme();

	const dark = theme.palette.secondary.dark;
	const main = theme.palette.secondary.main;
	const medium = theme.palette.secondary.main;

	return (
		<WidgetWrapper>
			<FlexBetween>
				<Typography color={dark} variant='h5' fontWeight='500'>
					Sponsored
				</Typography>
				<Typography color={medium}>Create Ad</Typography>
			</FlexBetween>
			<Image
				priority
				src='https://sfiso-mbonane-memories-app.s3.amazonaws.com/info4+(1).jpeg'
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
			<FlexBetween>
				<Typography color={main}>MikaCosmetics</Typography>
				<Typography color={main}>Mikacosmetics.com</Typography>
			</FlexBetween>
			<Typography color={medium} m='0.5rem 0'>
				Your one stop shop for all your beauty needs. We have a wide
				range of products to choose from. Visit our website today to see
				our latest products.
			</Typography>
		</WidgetWrapper>
	);
};

export default AdvertWidget;
