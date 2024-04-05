import React from 'react';
// @mui
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
// @components
import Form from '@/views/form';

const Login = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box>
			<Box
				width='100%'
				bgcolor={theme.palette.background.paper}
				p='1rem 6%'
				textAlign='center'
			>
				<Typography
					fontWeight='bold'
					fontSize='clamp(1rem, 2re, 2.25rem'
					color='primary'
					variant='h1'
				>
					Sociopedia
				</Typography>
			</Box>
			<Box
				width={isMobile ? '93%' : '50%'}
				p='2rem'
				m='2rem auto'
				borderRadius='1.5rem'
				bgcolor={theme.palette.background.paper}
			>
				<Typography
					fontWeight={500}
					variant='h5'
					sx={{
						mb: '1.5rem',
					}}
				>
					Welcome to Sociopedia, the Social Media for sociopaths
				</Typography>
				<Form />
			</Box>
		</Box>
	);
};

export default Login;
