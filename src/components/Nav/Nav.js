import React from 'react';

const Nav = ({ onRouteChange, route }) => {
  const signOut = e => onRouteChange(e, 'login');

  return (
    <nav
      style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}
    >
      {route === 'app' ? (
        <a
          className="f3 link dim black underline pa3 pointer"
          onClick={signOut}
        >
          Sign out
        </a>
      ) : null}
    </nav>
  );
};

export default Nav;
