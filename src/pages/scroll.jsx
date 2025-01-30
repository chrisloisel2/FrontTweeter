import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/forumSlice';
import { RootState, AppDispatch } from '../redux/store';
import Message from '../component/WsComponent';

const InfiniteScroll = () => {
	const dispatch = useDispatch();
	const { posts, hasMore, loading } = useSelector((state) => state.forum);

	const loadMore = useCallback(() => {
		if (hasMore && !loading) {
			console.log("raffraichissment utilisé");
			dispatch(fetchPosts());
		}
	}, [hasMore, loading, dispatch]);

	useEffect(() => {
		loadMore();
	}, []);

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
			loadMore();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<div style={styles.container}>
			<div style={{ flex: 1 }}>
				<h1>Infinite Scroll</h1>
				<ul>
					{posts.map((item, index) => (
						<li key={index}>
							<h3>{item.title}</h3>
							<p>{item.content}</p>
						</li>
					))}
				</ul>
				{loading && <p>Loading more items...</p>}
			</div>
			<div style={styles.sidebar}>
				<Message />
			</div>
		</div>
	);
};

const styles = {
	container: {
		backgroundColor: '#f0f0f0',
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
	},
	sidebar: {
		width: 600,
		backgroundColor: '#fff',
	},
};

export default InfiniteScroll;
