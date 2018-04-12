import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImgForm from './components/ImgForm/ImgForm';

const FaceRecognition = () => <p>Test Component</p>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Logo />
        <Rank />
        <ImgForm />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
