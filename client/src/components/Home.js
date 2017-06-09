import React from 'react';
import { Card, CardMedia } from 'material-ui/Card';

const style = {
  textAlign: 'center',
  position: 'relative',
  color: 'transparent',
};

const Home = () => (
  <Card>
    <CardMedia
      overlay={<h1>Welcome to Bandwith</h1>}
      overlayContainerStyle={style}
      overlayContentStyle={{ color: 'white' }}
    >
      <img alt="splash-img" src="/assets/hans-vivek-176134.jpg" />
    </CardMedia>
  </Card>
);

export default Home;
