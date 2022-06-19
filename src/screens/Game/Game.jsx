import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { initData, resetData } from '../../redux/slices/gameDataSlice';
import { startLevel, resetLevel } from '../../redux/slices/gameLevelSlice';
import { resetTime } from '../../redux/slices/timeSlice';
import { APP_CONSTANTS } from '../../utils/constants';
import styles from './Game.module.scss';
import { ShowTime } from './ShowTime/ShowTime';
import { getMineData } from '../../services/api';

export const Game = ({level = ''}) => {
	const dispatch = useDispatch();
	// const allGameData = useSelector(state => state.gameData.value);
	const [isEndGame, setIsEndGame] = useState(false);
	const [gameResultMessage, setGameResultMessage] = useState('');
	const [show, setShow] = useState(false);
	// const [gameData, setGameData] = useState([...allGameData.gameData] || []);
	// const [resultData, setResultData] = useState([...allGameData.resultData] || []);
	// let countUnopen = useRef(allGameData.countUnopen || -1);
	// let numOfMines = useRef(allGameData.numOfMines);
	const [gameData, setGameData] = useState([]);
	const [resultData, setResultData] = useState([]);
	const [isReset, setIsReset] = useState(false);
	let countUnopen = useRef(-1);
	let numOfMines = useRef(0);
	let time = useRef(0);
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
	
	const showTime = (time) => {
		let hour = 0;
		let minute = 0;
		let second = 0;
		second = time % 60;
		if (time > 60) {
			minute = Math.floor(time / 60);
			if (minute > 60) {
				hour = Math.floor(minute / 60);
				minute = minute % 60;
			}
		}
		return `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}:${('0' + second).slice(-2)}`
	};
	
	// const time = useSelector(state => state.time.value);
	const resetGame = (level) => {
		if (level) {
			setIsReset(true);
			dispatch(startLevel({level}));
		} else {
			dispatch(resetLevel());
			// dispatch(resetData());
			// dispatch(resetTime());
		}
	};
	
	const getTime = (data) => {
		time.current = data;
	};

	const checkMine = (x, y) => {
		const dataToCheck = resultData?.[x]?.[y];
		if (dataToCheck && !dataToCheck.opened) {
			if (dataToCheck.count === -1 && countUnopen.current > numOfMines.current) {
				setGameResultMessage('You lost the game in ' + showTime(time.current));
			}
			countUnopen.current -= 1;
			dataToCheck.opened = true;
			// dispatch(initData({countUnopen: countUnopen.current}));
			if (countUnopen.current === numOfMines.current) {
				setGameResultMessage('You won the game in ' + showTime(time.current));
				return;
			}
			if (dataToCheck.count === 0) {
				checkMine(x - 1, y);
				checkMine(x - 1, y - 1);
				checkMine(x - 1, y + 1);
				checkMine(x + 1, y);
				checkMine(x + 1, y - 1);
				checkMine(x + 1, y + 1);
				checkMine(x, y - 1);
				checkMine(x, y + 1);
			}
			setResultData([...resultData]);
			// dispatch(initData({resultData: [...resultData]}));
		}
	}
	
	const handleClose = (level) => {
		setGameResultMessage('');
		setShow(false);
		resetGame(level);
	}
	
	const init = () => {
		const size = edgeLength === APP_CONSTANTS.EDGE_LENGTH.BEGINNER ? 9 : 16;
		const mines = edgeLength === APP_CONSTANTS.EDGE_LENGTH.BEGINNER ? 10 : 40;
		countUnopen.current = Math.pow(edgeLength, 2);
		numOfMines.current = mines;
		setIsEndGame(false);
		getMineData(size, mines).then(response => response.json())
			.then(data => {
				if (data.msg === 'success') {
					const gameDataSorted = data.data.sort((a, b) => a.y === b.y ? (a.x - b.x) : (a.y - b.y));
					// dispatch(initData({
					// 	numOfMines: numOfMines.current,
					// 	countUnopen: countUnopen.current,
					// 	gameData: gameDataSorted,
					// 	isPlaying: true
					// }));
					setGameData(gameDataSorted);
				}
			})
			.catch(e => {
				console.error('error while getting data', e);
			});
	};
	
	useEffect(() => {
		// if (allGameData.isPlaying) {
		// 	setGameResultMessage(allGameData.gameResultMessage);
		// 	setGameData(allGameData.gameData);
		// 	setResultData(allGameData.resultData);
		// 	return;
		// }
		init();
	}, []);
	
	useEffect(() => {
		if (isReset) {
			setIsReset(false);
			init();
		}
	}, [isReset]);
	
	useEffect(() => {
		let result = [];
		for (let i = 0; i < edgeLength; i ++) {
			for (let j = 0; j < edgeLength; j ++) {
				if (!result[j]) {
					result[j] = [];
				}
				// j: pos X
				// i: pos Y
				// count: count number of mine. (count = -1: mine)
				// opened: opened state
				result[j][i] = {count: 0, opened: false};
			}
		}
		for (let g of gameData) {
			// set mine position
			result[g.x][g.y].count = -1;
			// set around mine positions
			let f1, f2 = false;
			if (g.x > 0) {
				result[g.x - 1][g.y].count === -1 ? -1 : result[g.x - 1][g.y].count++;
				if (g.y > 0) {
					result[g.x - 1][g.y - 1].count === -1 ? -1 : result[g.x - 1][g.y - 1].count++;
					result[g.x][g.y - 1].count === -1 ? -1 : result[g.x][g.y - 1].count++;
					f1 = true;
				} if (g.y < edgeLength - 1) {
					result[g.x - 1][g.y + 1].count === -1 ? -1 : result[g.x - 1][g.y + 1].count++;
					result[g.x][g.y + 1].count === -1 ? -1 : result[g.x][g.y + 1].count++;
					f2 = true;
				}
			}
			if (g.x < edgeLength - 1) {
				result[g.x + 1][g.y].count === -1 ? -1 : result[g.x + 1][g.y].count++;
				if (g.y > 0) {
					result[g.x + 1][g.y - 1].count === -1 ? -1 : result[g.x + 1][g.y - 1].count++;
					if (!f1) {
						result[g.x][g.y - 1].count === -1 ? -1 : result[g.x][g.y - 1].count++;
					}
				} if (g.y < edgeLength - 1) {
					result[g.x + 1][g.y + 1].count === -1 ? -1 : result[g.x + 1][g.y + 1].count++;
					if (!f2) {
						result[g.x][g.y + 1].count === -1 ? -1 : result[g.x][g.y + 1].count++;
					}
				}
			}
		}
		setResultData(result);
		// dispatch(initData({resultData: result}));
	}, [gameData]);
	
	useEffect(() => {
		// dispatch(initData({gameResultMessage}));
		if (gameResultMessage) {
			setIsEndGame(true);
			setShow(true);
		}
	}, [gameResultMessage]);
	
	return <div>
		{
			level ?
				<div className={styles.gameContainer}>
					<div className="d-flex gap-5 mb-3">
						<h4>{level.toUpperCase()}</h4>
						
						<ShowTime gameEnd={isEndGame} getTime={getTime} />
					</div>
					<div className="d-flex flex-column">
						{Array(edgeLength).fill(0).map((_x, i) =>
							<div key={i} className="d-flex flex-nowrap">
								{Array(edgeLength).fill(0).map((_y, j) =>
									<div key={j} className={`${styles.mine} x${j}-y${i} ${resultData?.[j]?.[i]?.opened ? 'open-' + resultData?.[j]?.[i]?.count : ''}`} onClick={() => checkMine(j, i)}></div>
								)}
							</div>
						)}
					</div>
					<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
						<Modal.Header>
							<Modal.Title>Result</Modal.Title>
						</Modal.Header>
						<Modal.Body>{gameResultMessage}</Modal.Body>
						<Modal.Footer>
							<Button variant='primary' onClick={() => handleClose(level)}>New Game</Button>
							<Button variant='primary' onClick={() => handleClose()}>Home</Button>
						</Modal.Footer>
					</Modal>
				</div>
				:
				<></>
		}
	</div>;
};

Game.propTypes = {
	level: PropTypes.string.isRequired
};