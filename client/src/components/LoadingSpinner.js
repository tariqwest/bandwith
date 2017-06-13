import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
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
    <CircularProgress size={80} thickness={5} />
    {/*<RefreshIndicator
      size={100}
      left={0}
      top={0}
      loadingColor="#00BCD4"
      status="loading"
      style={style.refresh}
    />*/}
  </div>
);

export default LoadingSpinner;
