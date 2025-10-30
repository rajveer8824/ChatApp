import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Routes, Route, and Navigate
import Left from './home/Leftpart/Left';
import Right from './home/Rightpart/Right';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/AuthProvider.jsx';

import Loading from './components/Loading.jsx';

function App() {
  const { authUser } = useAuth(); // Destructure only authUser since setAuthUser is not used
  console.log("Auth User:", authUser); // Debugging
  const  [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a loading delay of 1 second

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    

    <Routes>
      {/* Protected Route for Home */}
      <Route
        path="/"
        element={
          authUser ? (
            // <div className="flex h-screen overflow-hidden">
            //   <Left />
            //   <Right />
            // </div>
            <div className="drawer">
  <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-1" className="btn drawer-button">Open drawer</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Login Route */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      {/* Signup Route */}
      <Route path="/signup"
       element={authUser ? <Navigate to="/" /> :<Signup />} />
    </Routes>
   // <Loading />
    
    
  );
}

export default App;