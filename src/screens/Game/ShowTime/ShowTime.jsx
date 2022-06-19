import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { startCountTime } from '../../../redux/slices/timeSlice';

export const ShowTime = ({gameEnd, getTime}) => {
	// const dispatch = useDispatch();
	// const time = useSelector(state => state.time.value);
	// const [timeInSecond, setTimeInSecond] = useState(time);
	const [timeInSecond, setTimeInSecond] = useState(0);
	useEffect(() => {
		// const dispatchCountTime = () => {
		// 	dispatch(startCountTime());
		// };
		window.timeInterval = setInterval(() => {
			setTimeInSecond(timeInSecond => timeInSecond + 1);
		}, 1000);
		return () => {
			clearInterval(window.timeInterval);
		};
	}, []);
	
	useEffect(() => {
		getTime(timeInSecond);
	}, [timeInSecond]);

	useEffect(() => {
		if (gameEnd) {
			setTimeInSecond(0);
			clearInterval(window.timeInterval);
		} else {
			clearInterval(window.timeInterval);
			window.timeInterval = setInterval(() => {
				setTimeInSecond(timeInSecond => timeInSecond + 1);
			}, 1000);
		}
	}, [gameEnd]);

	return <div>{timeInSecond}</div>;
};

ShowTime.propTypes = {
	gameEnd: PropTypes.bool
};