import "./App.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext.tsx";
import AppRoutes from "@/App-router.tsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
          <AppRoutes />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
