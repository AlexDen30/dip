import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { RoutesSwitch } from './components/Routes';

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<RoutesSwitch />
			</BrowserRouter>
		</div>
	);
}

export default App;
