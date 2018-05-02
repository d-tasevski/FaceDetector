import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

import Nav from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImgForm from './components/ImgForm/ImgForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

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
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
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
    box: {},
    loading: false,
    route: 'login',
    signedIn: false,
    err: null,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  };

  // onInputChange = e =>
  // this.setState((state, props) => ({ input: e.target.value }));

  loadUser = user => {
    this.setState({ user });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('js-input-image');
    const width = parseInt(img.width, 10);
    const height = parseInt(img.height, 10);
    console.log(img, width, height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => this.setState({ box });

  onInputChange = e => this.setState({ input: e.target.value });

  onRouteChange = (e, route) => {
    if (route === 'login' || route === 'register') {
      return this.setState({ route });
    } else if (route === 'app') {
      return this.setState({ route, signedIn: true });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    return this.setState({ imgUrl: this.state.input, loading: true }, () =>
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.imgUrl)
        .then(response => {
          // do something with response
          console.log(response);
          this.setState({ loading: false });
          return this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(err => {
          // there was an error
          console.log(err);
          return this.setState({ loading: false, err });
        })
    );
  };

  render() {
    let route;

    if (this.state.route === 'app') {
      route = (
        <React.Fragment>
          <Rank />
          <ImgForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
          />
          <FaceRecognition
            loading={this.state.loading}
            box={this.state.box}
            imgUrl={this.state.imgUrl}
          />
        </React.Fragment>
      );
    } else if (this.state.route === 'register') {
      route = (
        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      );
    } else {
      route = (
        <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      );
    }

    console.log(this.state);
    return (
      <div className="App">
        <Particles className="particles" params={particlesConfig} />
        <Nav onRouteChange={this.onRouteChange} route={this.state.route} />
        <Logo />
        {route}
      </div>
    );
  }
}

export default App;
