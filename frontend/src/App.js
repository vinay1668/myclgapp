import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard.js';
import Main from './pages/Main.js';
import Me from "./pages/Me.js"
import User from "./pages/User.js"

import './App.css';
function App() {
  return (
    <>
      <Router>
          <div>
            
            <Routes>
              <Route path ='/' element={<Dashboard />}/>
              <Route path="/login" element ={<Main />}/>
              <Route path ="/me" element={<Me />}/>
              <Route path ="/user" element={<User />}/>
            </Routes>
          </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
