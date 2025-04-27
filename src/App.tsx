
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login/Login';
import { ProtectedRoute } from './routes/PrivateRoute';
import HorseDetails from './pages/HorseDetails/HorseDetails';
import HorseList from './pages/HorseList/HorseList';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/horses"
            element={
              <ProtectedRoute>
                <HorseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/horses/:id"
            element={
              <ProtectedRoute>
                <HorseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HorseList />
              </ProtectedRoute>
            }
          />
        </Routes>
    </Router>
  );
}


export default App
