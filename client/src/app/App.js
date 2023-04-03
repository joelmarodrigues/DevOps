import { useState, useEffect } from 'react';
import Home from '../components/HomePage';
import Login from '../components/LoginPage';
import firebase from '../services/firebase';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
        })
    }, [])

    return (
        <div>
            {user ? <Home user={user} /> : <Login />}
        </div>
    );
}

export default App;
