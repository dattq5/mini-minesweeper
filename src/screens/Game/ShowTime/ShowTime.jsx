import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { startCountTime } from '../../../redux/slices/timeSlice';

export const ShowTime = ({gameEnd}) => {
	const dispatch = useDispatch();
	const timeInSecond = useSelector(state => state.time.value);
	console.log('timeInSecond', timeInSecond);
	useEffect(() => {
		window.timeInterval = setInterval(() => {
			dispatch(startCountTime());
		}, 1000);
		return () => {
			clearInterval(window.timeInterval);
		};
	}, []);

	useEffect(() => {
		if (gameEnd) {
			console.log('vao day');
			clearInterval(window.timeInterval);
		}
	}, [gameEnd]);

	return <div>{timeInSecond}</div>;
};

ShowTime.propTypes = {
	gameEnd: PropTypes.bool
};