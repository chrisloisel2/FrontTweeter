import React, { useState, useEffect } from 'react';
import { login } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	useEffect(() => {
		if (auth.status === 'succeeded') {
			navigate('/scroll');
		}
	}, [auth.status, navigate]);

	return (
		<div>
			<h1>Login Page</h1>
			<p>Welcome to the login page!</p>
			<form onSubmit={handleLogin}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" disabled={auth.status === 'loading'}>
					{auth.status === 'loading' ? 'Connexion en cours...' : 'Login'}
				</button>
				{auth.status === 'failed' && <p>{auth.error.message}</p>}
			</form>
		</div>
	);
};

export default Login;
