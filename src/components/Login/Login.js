import React from 'react';
import './Login.css';

class Login extends React.Component {
  state = {
    signInEmail: '',
    signInPass: ''
  };

  onEmailChange = e => {
    this.setState({ signInEmail: e.target.value });
  };

  onPassChange = e => {
    this.setState({ signInPass: e.target.value });
  };

  login = e => this.props.onRouteChange(e, 'app');
  register = e => this.props.onRouteChange(e, 'register');

  onSignIn = e => {
    e.preventDefault();
    fetch('http://localhost:3003/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        pass: this.state.signInPass
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          this.props.loadUser(data[0]);
          this.login(e);
        }
      });
  };

  render() {
    return (
      <main className="pa2   black-80 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-35-l mw5 center">
        <form onSubmit={e => this.onSignIn(e)} className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                onChange={this.onEmailChange}
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                onChange={this.onPassChange}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me
            </label>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <a
              onClick={this.register}
              href="#0"
              className="f6 link dim black db"
            >
              Sign up
            </a>
            <a href="#0" className="f6 link dim black db">
              Forgot your password?
            </a>
          </div>
        </form>
      </main>
    );
  }
}

export default Login;
