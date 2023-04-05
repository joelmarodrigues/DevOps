import Home from "../components/HomePage";
import Login from "../components/LoginPage";
import { useAuth } from "../services/AuthProvider";
import React, { useEffect } from "react";
import { fetchServerStatus } from "../services/http-common";

function App() {
  const { user, role } = useAuth();
  
  useEffect(() => {
    fetchServerStatus();
  }, []);

  return (
    <div>
      {user ? <Home user={user} role={role} /> : <Login />}
    </div>
  );
}

export default App;
