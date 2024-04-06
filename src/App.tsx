import "./App.css";
import AppLayout from "./components/AppLayout";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
