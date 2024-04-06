import "./App.css";
import AppLayout from "./components/AppLayout";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GlobalErrorHandlerProvider } from "./context/GlobalErrorHandlerContext";

function App() {
  return (
    <>
      <Router>
        <GlobalErrorHandlerProvider>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </GlobalErrorHandlerProvider>
      </Router>
    </>
  );
}

export default App;
