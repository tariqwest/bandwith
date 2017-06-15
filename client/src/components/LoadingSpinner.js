import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

const LoadingSpinner = () => (
  <div style={style.container}>
    <CircularProgress size={80} thickness={5} color="rgb(255, 64, 129)" />
  </div>
);

export default LoadingSpinner;
