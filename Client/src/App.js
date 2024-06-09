import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '@stripe/stripe-js'

import Home from './Views/Home';
import FindDev from './Views/FindDev';
import FindJob from './Views/FindJob';
import Login from './Views/Login';
import CreateAccount from './Views/CreateAccount';
import ErrorPage from './Views/ErrorPage';
import PostJob from './Views/PostJob';
import Cancel from './Components/PostJob/Cancel';
import Success from './Components/PostJob/Success';

import NavBar from './Components/Header/NavBar';
import Footer from './Components/Footer/Footer';

import { UserProvider } from './Utils/UserContext';

import './index.css';
import MyLinks from './Views/MyLinks';
import VideoRoom from './Views/VideoRoom';

function App() {
  const navigate = useNavigate()

  return (
    <div>
      <UserProvider navigate={navigate}>
        <NavBar />
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="/find-dev" element={ <FindDev /> } />
            <Route path="/find-job" element={ <FindJob /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/create-account" element={ <CreateAccount /> } />
            <Route path="/post-job" element={ <PostJob /> } />
            <Route path='/cancel' element={<Cancel />} />
            <Route path='/success' element={<Success />} />
            <Route path='/my-links' element={<MyLinks />} />
            <Route path='/video-room/:invitedEmail' element={<VideoRoom />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App