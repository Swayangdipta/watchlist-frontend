import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Base from './Core/Base';
import { ContentProvider } from './ContentContext';
import { SearchProvider } from './SearchContext';
import Profile from './Dashboard/Profile';
import { SeparatedProvider } from './SeparatedContext';
import NotFound from './Core/NotFound';
import ViewUser from './Core/ViewUser';
import Home from './Core/Home';

function App() {
  return (
    <Router>
      <ContentProvider>
      <SearchProvider>
      <SeparatedProvider >
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Base/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/user/:userId' element={<ViewUser/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </SeparatedProvider>
      </SearchProvider>
      </ContentProvider>
    </Router>
  );
}

export default App;
