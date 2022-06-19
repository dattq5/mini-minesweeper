import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { startLevel } from '../../redux/slices/gameLevelSlice';
import { APP_CONSTANTS } from '../../utils/constants';

export const Welcome = () => {
	const dispatch = useDispatch();
	return (
		<Stack gap={2} className="col-md-5 mx-auto">
			<h3>Choose game level:</h3>
			<Button variant="success"
				onClick={() => dispatch(startLevel({level: APP_CONSTANTS.GAME_LEVEL.BEGINNER}))}
				size="lg">Beginner</Button>
			<Button variant="warning"
				onClick={() => dispatch(startLevel({level: APP_CONSTANTS.GAME_LEVEL.INTERMEDIATE}))}
				size="lg">Intermediate</Button>
		</Stack>
	);
};