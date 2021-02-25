import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Url from './components/Url';

function App() {
  return (
    <div className="Apps">
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/url/:id" component={Url} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
