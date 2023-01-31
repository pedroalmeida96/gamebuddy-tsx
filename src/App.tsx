import GamesTable from "./GameTable";
import Login from "./Login";
import { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      console.log(username + ", " + password);
      const response = await axios.post(
        "http://localhost:8080/login?username=" + username + "&password=" + password,);
      console.log(response.data);
      if (response.data == "login") {
        console.log("sucesso na auth");
        setIsLoggedIn(true);
      } else {
        // Handle failed login
      }
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