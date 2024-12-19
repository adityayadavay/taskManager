import './App.css';
import Home from "./Home";
import Login from "./Login/login"
import Register from "./Register/registration";
import ProjectContainer from "./Projects/projectContainer"
import MemberContainer from "./Members/memberContainer";
import { Authenticator } from './service/authenticate';
import ProtectedRoute from './service/protectedRoute';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Authenticator>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/project/*' element={<ProtectedRoute><ProjectContainer /></ProtectedRoute>} />
          <Route path="/member/*" element={<ProtectedRoute>< MemberContainer /></ProtectedRoute>} />

        </Routes>
      </div>
    </Authenticator>
  );
}

export default App;

