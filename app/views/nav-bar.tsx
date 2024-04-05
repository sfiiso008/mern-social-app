import React from 'react';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
// @store
import { useStore, useUiStore } from '@/store/session';
// @mui
import {
	Box,
	IconButton,
	InputBase,
	Typography,
	Select,
	MenuItem,
	FormControl,
	useTheme,
	useMediaQuery,
} from '@mui/material';
// @icons
import {
	Search as SearchIcon,
	Message,
	DarkMode,
	Notifications,
	LightMode,
	Help,
	Close,
	Menu,
} from '@mui/icons-material';
// @components
import FlexBetween from '@/components/flex-between';

const NavBar = () => {
	const router = useRouter();
	const { logout, firstName, lastName } = useStore(
		useShallow((state) => ({
			logout: state.logout,
			firstName: state.user.firstName,
			lastName: state.user.lastName,
		}))
	);

	const { toggleMode } = useUiStore(
		useShallow((state) => ({
			toggleMode: state.toggleMode,
		}))
	);

	const theme = useTheme();

	const [isMobileMenuToggled, setIsMobileMenuToggled] = React.useState(false);

	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const neutralLight = theme.palette.secondary.light;
	const dark = theme.palette.secondary.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const alt = theme.palette.background.paper;

	const fullName = `${firstName} ${lastName}`;

	const handleLogout = async () => {
		await logout();
		router.push('/login');
	};

	return (
		<FlexBetween bgcolor={alt} padding='1rem 6%'>
			<FlexBetween gap='1.75rem'>
				<Typography
					fontWeight='bold'
					fontSize='clamp(1rem, 2re, 2.25rem)'
					color={theme.palette.primary.main}
					onClick={() => router.push('/')}
					sx={{
						'&:hover': {
							cursor: 'pointer',
							color: primaryLight,
						},
					}}
				>
					Sociopedia
				</Typography>
				{isDesktop && (
					<FlexBetween
						bgcolor={neutralLight}
						borderRadius='9px'
						gap='3rem'
						p='0.1rem 1.5rem'
					>
						<InputBase placeholder='Search...' />
						<IconButton>
							<SearchIcon />
						</IconButton>
					</FlexBetween>
				)}
			</FlexBetween>

			{isDesktop ? (
				<FlexBetween gap='2rem'>
					<IconButton onClick={() => toggleMode()}>
						{theme.palette.mode === 'dark' ? (
							<LightMode
								sx={{
									fontSize: '25px',
								}}
							/>
						) : (
							<DarkMode
								sx={{
									color: dark,
									fontSize: '25px',
								}}
							/>
						)}
					</IconButton>
					<Message
						sx={{
							color: dark,
							fontSize: '25px',
						}}
					/>
					<Notifications
						sx={{
							color: dark,
							fontSize: '25px',
						}}
					/>
					<Help
						sx={{
							color: dark,
							fontSize: '25px',
						}}
					/>
					<FormControl>
						<Select
							value={fullName}
							sx={{
								backgroundColor: neutralLight,
								width: '200px',
								borderRadius: '0.25rem',
								p: '0.25rem 1rem',
								'&.MuiSvgIcon-root': {
									pr: '0.25rem',
									width: '3rem',
								},
								'&. MuiSelect-select:focus': {
									backgroundColor: neutralLight,
								},
							}}
							input={<InputBase />}
						>
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>
							<MenuItem onClick={() => logout()}>Logout</MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton
					onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
				>
					<Menu />
				</IconButton>
			)}

			{isMobile && isMobileMenuToggled && (
				<Box
					position='fixed'
					right='0'
					bottom='0'
					height='100%'
					maxWidth='500px'
					minWidth='300px'
					bgcolor={background}
					zIndex={10}
				>
					<Box display='flex' justifyContent='flex-end' p='1rem'>
						<IconButton
							onClick={() =>
								setIsMobileMenuToggled(!isMobileMenuToggled)
							}
						>
							<Close />
						</IconButton>
					</Box>
					<FlexBetween
						display='flex'
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						gap='3rem'
					>
						<IconButton onClick={() => toggleMode()}>
							{theme.palette.mode === 'dark' ? (
								<LightMode
									sx={{
										fontSize: '25px',
									}}
								/>
							) : (
								<DarkMode
									sx={{
										color: dark,
										fontSize: '25px',
									}}
								/>
							)}
						</IconButton>

						<Message
							sx={{
								color: dark,
								fontSize: '25px',
							}}
						/>

						<Notifications
							sx={{
								color: dark,
								fontSize: '25px',
							}}
						/>

						<Help
							sx={{
								color: dark,
								fontSize: '25px',
							}}
						/>
						<FormControl>
							<Select
								value={fullName}
								sx={{
									backgroundColor: neutralLight,
									width: '200px',
									borderRadius: '0.25rem',
									p: '0.25rem 1rem',
									'&.MuiSvgIcon-root': {
										pr: '0.25rem',
										width: '3rem',
									},
									'&. MuiSelect-select:focus': {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}
							>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									Logout
								</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	);
};

export default NavBar;
