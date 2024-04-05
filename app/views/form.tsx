import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';
// @form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// @store
import { useStore } from '@/store/session';
// @api
import { apiFunctions } from '@/pages/api';
// @mui
import {
	Box,
	Button,
	TextField,
	useMediaQuery,
	Typography,
	useTheme,
} from '@mui/material';
// @mui-icons
import { EditOutlined } from '@mui/icons-material';
// @components
import FlexBetween from '@/components/flex-between';

interface ILoginValues {
	email: string;
	password: string;
}

interface IRegisterValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	location: string;
	occupation: string;
}

const registerSchema = Yup.object().shape({
	firstName: Yup.string().label('First name').required(),
	lastName: Yup.string().label('Last name').required(),
	email: Yup.string().email().lowercase().required().label('Email address'),
	password: Yup.string().label('Password').required(),
	location: Yup.string().label('Location').required(),
	occupation: Yup.string().label('Occupation').required(),
});

const loginSchema = Yup.object().shape({
	email: Yup.string().email().lowercase().required().label('Email address'),
	password: Yup.string().label('Password').required(),
});

const Form = () => {
	const router = useRouter();
	const theme = useTheme();

	const { login } = useStore(
		useShallow((state) => ({
			login: state.login,
		}))
	);

	const [mode, setMode] = React.useState<'login' | 'register'>('login');
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isLogin = mode === 'login';
	const isRegister = mode === 'register';
	const [file, setFile] = React.useState<File | null>(null);

	const { handleSubmit, control, reset } = useForm<
		IRegisterValues | ILoginValues
	>({
		resolver: yupResolver(isLogin ? loginSchema : registerSchema),
	});

	const submit = async (data: IRegisterValues | ILoginValues) => {
		if (isLogin) {
			const res = await login(data as ILoginValues);

			if (res.success) {
				router.push('/');
				reset({
					email: '',
					password: '',
				});
			}
		} else {
			if (!file) {
				return;
			}

			const res = await apiFunctions.register(
				file as File,
				data as IRegisterValues
			);

			if (res.success) {
				setMode('login');
				setFile(null);
				reset({
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					location: '',
					occupation: '',
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(submit)}>
			<Box
				display='grid'
				gap='30px'
				gridTemplateColumns='repeat(4, minmax(0, 1fr))'
				sx={{
					'& > div': {
						gridColumn: isMobile ? 'span 4' : undefined,
					},
				}}
			>
				{isRegister && (
					<>
						<Controller
							name='firstName'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									value={value}
									onChange={onChange}
									placeholder='First Name'
									name='firstName'
									type='name'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>
						<Controller
							name='lastName'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									value={value}
									onChange={onChange}
									placeholder='Last Name'
									name='lastName'
									type='name'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>{' '}
						<Controller
							name='email'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									fullWidth
									value={value}
									onChange={onChange}
									placeholder='Email Address'
									name='email'
									type='email'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>{' '}
						<Controller
							name='password'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									value={value}
									onChange={onChange}
									placeholder='Password (min. 8 characters)'
									name='password'
									type='password'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>{' '}
						<Controller
							name='location'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									value={value}
									onChange={onChange}
									placeholder='Enter your location'
									name='location'
									type='text'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>
						<Controller
							name='occupation'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									value={value}
									onChange={onChange}
									placeholder='Enter your occupation'
									name='occupation'
									type='text'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>
						<Box
							gridColumn='span 4'
							border={`1px solid ${theme.palette.secondary.light}`}
						>
							<Dropzone
								accept={{ 'image/jpeg': ['.jpeg', '.png'] }}
								multiple={false}
								onDrop={(acceptedFiles) => {
									setFile(acceptedFiles[0]);
								}}
							>
								{({ getRootProps, getInputProps }) => (
									<Box
										{...getRootProps()}
										border={`2px dahsed ${theme.palette.primary.light}`}
										sx={{
											'&:hover': {
												cursor: 'pointer',
											},
										}}
									>
										<input {...getInputProps()} />
										{!file ? (
											<p>Add a picture</p>
										) : (
											<FlexBetween>
												{file.name}
											</FlexBetween>
										)}
									</Box>
								)}
							</Dropzone>
						</Box>
					</>
				)}
				{isLogin && (
					<>
						<Controller
							name='email'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									value={value}
									onChange={onChange}
									placeholder='Email Address'
									name='email'
									type='email'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>
						<Controller
							name='password'
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, value, onBlur },
								fieldState: { error },
							}) => (
								<TextField
									value={value}
									onChange={onChange}
									placeholder='Password'
									name='password'
									type='password'
									onBlur={onBlur}
									error={!!error}
									helperText={error?.message}
									sx={{
										gridColumn: 'span 2',
									}}
								/>
							)}
						/>
					</>
				)}
			</Box>
			<Box>
				<Button
					fullWidth
					type='submit'
					sx={{
						m: '1rem 0',
						p: '1rem',
						backgroundColor: theme.palette.primary.main,
						color: theme.palette.background.paper,
						'&:hover': {
							color: theme.palette.primary.main,
						},
					}}
				>
					{isLogin ? 'Login' : 'Register'}
				</Button>
				<Typography
					onClick={() => setMode(isLogin ? 'register' : 'login')}
					sx={{
						textDecoration: 'underline',
						color: theme.palette.primary.main,
						'&:hover': {
							cursor: 'pointer',
							color: theme.palette.primary.light,
						},
					}}
				>
					{isLogin
						? 'Don’t have an account?'
						: 'Already have an account?'}
				</Typography>
			</Box>
		</form>
	);
};

export default Form;
