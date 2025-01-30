import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Message = () => {
	const [ws, setWs] = useState(null); // ws dans un state
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	const currentUser = useSelector((state) => state.auth.user); // Récupère l'utilisateur connecté depuis Redux

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:8080'); // Démarre une connexion WebSocket

		setWs(socket);

		socket.onopen = () => { // Ouvre la connexion
			console.log('Connected');
			socket.send(JSON.stringify({ type: 'Connexion', data: currentUser._id })); // GetUser -> Récupère la liste des utilisateurs connectés
			socket.send(JSON.stringify({ type: 'getUsers', data: "yolo" })); // GetUser -> Récupère la liste des utilisateurs connectés
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);

			if (data.type === 'users') {
				setUsers(data.users); // Met à jour la liste des utilisateurs connectés
			} else if (data.type === 'message') {
				setMessages((prev) => [...prev, data]); // Ajoute un message reçu
			}
		};

		socket.onclose = () => {
			console.log('Disconnected');
		};

		return () => {
			socket.close();
		};
	}, []);

	const sendMessage = () => {
		if (ws && selectedUser && message.trim() !== '') {
			ws.send(
				JSON.stringify({
					type: 'message',
					to: selectedUser.id,
					from: currentUser.id,
					message,
				})
			);
			setMessages((prev) => [
				...prev,
				{ from: currentUser.id, to: selectedUser.id, message },
			]);
			setMessage('');
		}
	};

	return (
		<div style={styles.container}>
			<div style={styles.sidebar}>
				<h3>Utilisateurs connectés</h3>
				<ul>
					{users.map((user) => (
						<li
							key={user.id}
							onClick={() => setSelectedUser(user)}
							style={{
								cursor: 'pointer',
								fontWeight: selectedUser?.id === user.id ? 'bold' : 'normal',
							}}
						>
							{user.name}
						</li>
					))}
				</ul>
			</div>

			<div style={styles.chatContainer}>
				<div style={styles.chatHeader}>
					{selectedUser ? `Chat avec ${selectedUser.name}` : 'Sélectionnez un utilisateur'}
				</div>
				<div style={styles.messages}>
					{messages
						.filter(
							(msg) =>
								(msg.from === currentUser.id && msg.to === selectedUser?.id) ||
								(msg.to === currentUser.id && msg.from === selectedUser?.id)
						)
						.map((msg, index) => (
							<div key={index} style={msg.from === currentUser.id ? styles.sentMessage : styles.receivedMessage}>
								{msg.message}
							</div>
						))}
				</div>

				{selectedUser && (
					<div style={styles.inputContainer}>
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Écrivez un message..."
							style={styles.input}
						/>
						<button onClick={sendMessage} style={styles.sendButton}>
							Envoyer
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		width: '80%',
		height: '500px',
		margin: '20px auto',
		border: '1px solid #ccc',
		borderRadius: '10px',
		overflow: 'hidden',
		fontFamily: 'Arial, sans-serif',
	},
	sidebar: {
		width: '30%',
		background: '#f5f5f5',
		padding: '10px',
		borderRight: '1px solid #ccc',
	},
	chatContainer: {
		width: '70%',
		display: 'flex',
		flexDirection: 'column',
	},
	chatHeader: {
		background: '#007bff',
		color: '#fff',
		padding: '10px',
		textAlign: 'center',
	},
	messages: {
		flex: 1,
		padding: '10px',
		overflowY: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	sentMessage: {
		alignSelf: 'flex-end',
		background: '#007bff',
		color: '#fff',
		padding: '8px',
		borderRadius: '10px',
		marginBottom: '5px',
	},
	receivedMessage: {
		alignSelf: 'flex-start',
		background: '#f1f1f1',
		color: '#333',
		padding: '8px',
		borderRadius: '10px',
		marginBottom: '5px',
	},
	inputContainer: {
		display: 'flex',
		padding: '10px',
		borderTop: '1px solid #ccc',
	},
	input: {
		flex: 1,
		padding: '8px',
		borderRadius: '5px',
		border: '1px solid #ccc',
	},
	sendButton: {
		marginLeft: '10px',
		padding: '8px 12px',
		background: '#007bff',
		color: '#fff',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
	},
};

export default Message;
