import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { /*useSelector, */useDispatch } from 'react-redux';
import { startBeginnerLevel, startIntermediateLevel } from '../../redux/slices/gameLevelSlice';

export const Welcome = () => {
	// const gameLevel = useSelector(state => state.gameLevel.value);
	const dispatch = useDispatch();
	return (
		<Stack gap={2} className="col-md-5 mx-auto">
			<h3>Choose game level:</h3>
			<Button variant="success"
				onClick={() => dispatch(startBeginnerLevel())}
				size="lg">Beginner</Button>
			<Button variant="warning"
				onClick={() => dispatch(startIntermediateLevel())}
				size="lg">Intermediate</Button>
		</Stack>
	);
};