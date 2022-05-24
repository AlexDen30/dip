import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { RoutesSwitch } from './components/Routes';

function App() {

	const [currentUser, setCurrentUser] = useState(false)

	return (
		<div className="App">
			<BrowserRouter>
				<RoutesSwitch currentUser={currentUser} setUser={(user) => setCurrentUser(user)} />
			</BrowserRouter>
		</div>
	);
}

export default App;
