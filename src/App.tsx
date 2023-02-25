import GamesTable from "./GameTable";
import Login from "./Login";
import { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      console.log("sucesso na auth");
      setIsLoggedIn(true);
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <GamesTable />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;