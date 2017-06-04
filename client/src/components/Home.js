import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <RaisedButton label="Sign Up" containerElement={<Link to="/signup" />} />
  </div>
);

export default Home;
