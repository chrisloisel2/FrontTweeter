import React, { useState } from 'react';

const Subscribe = () => {

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubscribe = () => {
		console.log('Username:', username);
		console.log('Email:', email);
		console.log('Password:', password);
	};
	return (
		<div>
			<h1>Subscribe Page</h1>
			<p>Welcome to the subscribe page!</p>
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				id="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<label htmlFor="email">Email:</label>
			<input
				type="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleSubscribe}>Subscribe</button>
		</div>
	);
};

export default Subscribe;
