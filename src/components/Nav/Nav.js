import React from 'react';

const Nav = () => {
  return (
    <nav
      style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}
    >
      <a className="f3 link dim black underline pa3 pointer">Sign out</a>
    </nav>
  );
};

export default Nav;
