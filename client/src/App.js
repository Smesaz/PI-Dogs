import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path='/landing'>
        <Landing/>
      </Route>
      <Route path='/'>
        <Nav/>
      </Route>
      <Route path='/home'>
        <Home/>
      </Route>
      <Route path='/details'>
        <Details/>
      </Route>
      <Route path='/newbreed'>
        <NewBreed/>
      </Route>
    </div>
  );
}

export default App;
