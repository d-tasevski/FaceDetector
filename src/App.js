import React, { Component } from 'react';
import Particles from 'react-particles-js';

import './App.css';

import Nav from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImgForm from './components/ImgForm/ImgForm';

const FaceRecognition = () => <p>Test Component</p>;

const particlesConfig = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: '#3CA9D1',
        blur: 5
      }
    },
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.2
      },
      push: {
        particles_nb: 4
      }
    }
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesConfig} />
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
