import './App.css';
import { AuthProvider } from './services/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<SignIn />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
