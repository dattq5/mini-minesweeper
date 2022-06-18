export function getMineData(size = 9, mines = 10) {
	return fetch(`https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`);
}
