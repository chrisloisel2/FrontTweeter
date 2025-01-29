import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/forumSlice';
import { RootState, AppDispatch } from '../redux/store';

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
		<div>
			<h1>Infinite Scroll</h1>
			<ul>
				{posts.map((item, index) => (
					<li key={index}>
						<h3>{item.title}</h3>
						<p>{item.content}</p>
						<p>:D</p>
						<p>:D</p>
						<p>:D</p>
						<p>:D</p>
					</li>
				))}
			</ul>
			{loading && <p>Loading more items...</p>}
		</div>
	);
};

export default InfiniteScroll;
