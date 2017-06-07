import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <RaisedButton label="I'm new" containerElement={<Link to="/signup" />} />
    <RaisedButton label="I'm returning" containerElement={<Link to="/results" />} />
  </div>
);

export default Home;
