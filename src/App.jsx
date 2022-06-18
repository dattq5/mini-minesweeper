import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Game } from './screens/Game/Game';
import { Welcome } from './screens/Welcome/Welcome';

function App() {
	const level = useSelector(state => state.gameLevel?.value || '');
	return (
		<div className="App">
			{
				level ?
					<Game level={level} />
					:
					<Welcome />
			}
		</div>
	);
}

export default App;
