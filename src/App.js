import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

import Nav from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImgForm from './components/ImgForm/ImgForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
  apiKey: 'cd32495999b84645b1b01f40271a0605'
});

const particlesConfig = {
  particles: {
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
  state = {
    input: '',
    imgUrl: '',
    err: null
  };

  // onInputChange = e =>
  // this.setState((state, props) => ({ input: e.target.value }));

  onInputChange = e => this.setState({ input: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    return this.setState({ imgUrl: this.state.input }, () =>
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imgUrl).then(
        response => {
          console.log(response);
          // do something with response
        },
        err => {
          // there was an error
        }
      )
    );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesConfig} />
        <Nav />
        <Logo />
        <Rank />
        <ImgForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imgUrl={this.state.imgUrl} />
      </div>
    );
  }
}

export default App;
