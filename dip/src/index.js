import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { firebaseAuth, firebaseDB } from './firebaseConfig';

export const FirebaseContext = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebaseDB, firebaseAuth}}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);


