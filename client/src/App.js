import React from 'react';
import {Route, Routes,Navigate} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import NewBreed from './components/NewBreed/NewBreed';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='home' element={<Home/>}/>
      <Route path='details/:id' element={<Details/>}/>
      <Route path='newbreed' element={<NewBreed/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
