import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Base from './Core/Base';
import Auth from './Auth/Auth'
import { ContentProvider } from './ContentContext';
import { SearchProvider } from './SearchContext';
import Profile from './Dashboard/Profile';

function App() {
  return (
    <Router>
      <ContentProvider>
      <SearchProvider>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Base/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      </SearchProvider>
      </ContentProvider>
    </Router>
  );
}

export default App;
