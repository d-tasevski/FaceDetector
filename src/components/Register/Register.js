import React from 'react';
import './Register.css';

class Register extends React.Component {
  state = {
    email: '',
    pass: '',
    name: ''
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPassChange = e => {
    this.setState({ pass: e.target.value });
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onRegister = e => {
    e.preventDefault();

    fetch('http://localhost:3003/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        pass: this.state.pass
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user) {
          console.log(user);
          this.props.loadUser(user);
          this.register(e);
        }
      });
  };

  register = e => this.props.onRouteChange(e, 'app');

  render() {
    return (
      <article className="pa4 black-80">
        <form
          onSubmit={this.onRegister}
          action="sign-up_submit"
          method="get"
          acceptCharset="utf-8"
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email-address">
                Email address
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent dim black"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">
                Name
              </label>
              <input
                onChange={this.onNameChange}
                className="b pa2 input-reset ba bg-transparent dim black"
                type="text"
                name="password"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={this.onPassChange}
                className="b pa2 input-reset ba bg-transparent dim black"
                type="password"
                name="password"
                id="password--repeat"
              />
            </div>
          </fieldset>
          <div className="mt3">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
      </article>
    );
  }
}

export default Register;
