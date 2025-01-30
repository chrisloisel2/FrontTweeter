import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import Subscribe from './pages/subscribe';
import InfiniteScroll from './pages/scroll';
import ProtectedRoute from './pages/protectedRoute';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/subscribe" element={<Subscribe />} />
				<Route path="/scroll" element={<ProtectedRoute element={<InfiniteScroll />} />} />
			</Routes>
		</Router>
	);
}

export default App;
