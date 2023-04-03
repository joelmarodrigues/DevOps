import Home from "../components/HomePage";
import Login from "../components/LoginPage";
import { useAuth } from "../services/AuthProvider";

function App() {
  const { user, role } = useAuth();
  return (
    <div>
      {user ? <Home user={user} role={role} /> : <Login />}
    </div>
  );
}

export default App;
