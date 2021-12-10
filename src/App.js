import './App.css';
import React from 'react';
import { Main } from './component/Main';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './component/Auth';
import { SignUp } from './component/SignUp';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      c: localStorage.getItem("token")
    }
  }

  render() {
    if (this.state.c) {
      return (
        <div>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/Auth" element={<Auth />} />
          </Routes>
        </div>)
    }

    return (
      <div>
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/Auth" element={<Auth />} />
        </Routes>
      </div>)
  }
}



