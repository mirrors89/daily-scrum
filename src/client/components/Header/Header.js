import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1>
      <Link to="/">Sixshop Daily Scrum</Link>
    </h1>

    <nav>
      <Link to="/helloworld">menu</Link>
    </nav>

    <hr />
  </header>
);

export default Header;