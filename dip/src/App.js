import { collection } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext } from '.';
import './App.scss';
import { RoutesSwitch } from './components/Routes';

function App() {

	const {firebaseDB} = useContext(FirebaseContext)

	const [currentUser, setCurrentUser] = useState(false)
	const collectionRef = collection(firebaseDB, 'users')
	const [users, setUsers] = useState([])

	useEffect(() => {

		// const getUs

	}, [])

	return (
		<div className="App">
			<BrowserRouter>
				<RoutesSwitch currentUser={currentUser} setUser={(user) => setCurrentUser(user)} />
			</BrowserRouter>
		</div>
	);
}

export default App;
