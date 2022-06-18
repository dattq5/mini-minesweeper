import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { initData, resetData } from '../../redux/slices/gameDataSlice';
import { resetLevel } from '../../redux/slices/gameLevelSlice';
import { resetTime } from '../../redux/slices/timeSlice';
import { APP_CONSTANTS } from '../../utils/constants';
import styles from './Game.module.scss';
import { ShowTime } from './ShowTime/ShowTime';
import { getMineData } from '../../services/api';

export const Game = ({level = ''}) => {
	const dispatch = useDispatch();
	const [isEndGame, setIsEndGame] = useState(false);
	const [gameData, setGameData] = useState([]);
	const [edgeLength] = useState(() => {
		let edgeVar = 0;
		switch (level) {
		case APP_CONSTANTS.GAME_LEVEL.BEGINNER:
			edgeVar = APP_CONSTANTS.EDGE_LENGTH.BEGINNER;
			break;
		case APP_CONSTANTS.GAME_LEVEL.INTERMEDIATE:
			edgeVar = APP_CONSTANTS.EDGE_LENGTH.INTERMEDIATE;
			break;
		default:
			break;
		}
		return edgeVar;
	});
	const resetGame = () => {
		dispatch(resetData());
		dispatch(resetLevel());
		dispatch(resetTime());
	};

	useEffect(() => {
		const size = edgeLength === APP_CONSTANTS.EDGE_LENGTH.BEGINNER ? 9 : 16;
		const mines = edgeLength === APP_CONSTANTS.EDGE_LENGTH.BEGINNER ? 10 : 40;
		getMineData(size, mines).then(response => response.json())
			.then(data => {
				console.log('data', data);
				if (data.msg === 'success') {
					dispatch(initData(data.data));
					setGameData(data.data);
				}
			})
			.catch(e => {
				console.error('error while getting data', e);
			});
	}, []);
	
	return <div>
		{
			level ?
				<div className={styles.gameContainer}>
					<div className="d-flex gap-5 mb-3">
						<h4>{level.toUpperCase()}</h4>
						<Button variant='danger' onClick={resetGame}>Reset</Button>
						<ShowTime gameEnd={isEndGame} />
					</div>
					<div className="d-flex flex-column">
						{Array(edgeLength).fill(0).map((_x, i) =>
							<div key={i} className="d-flex flex-nowrap">
								{Array(edgeLength).fill(0).map((_y, j) =>
									<div key={j} className={`${styles.mine} x${j}-y${i}`}></div>
								)}
							</div>
						)}
					</div>
				</div>
				:
				<></>
		}
	</div>;
};

Game.propTypes = {
	level: PropTypes.string.isRequired
};