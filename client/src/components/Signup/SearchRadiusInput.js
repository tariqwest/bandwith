import React from 'react';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui-slider-label/Slider';
import { grey300 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  subheader: {
    textTransform: 'capitalize',
    paddingBottom: '15px',
  },
  labelStyleOuter: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: 'rgb(255, 64, 129)',
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
  },
  labelStyleOuterDisabled: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: grey300,
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
  },
  labelStyleInner: {
    transform: 'rotate(45deg)',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '3px',
    right: '0px',
    fontSize: '10px',
  },
  slider: {
    palette: {
      primary1Color: 'rgb(255, 64, 129)',
      accent1Color: 'rgb(255, 64, 129)',
    },
  },
};

const SearchRadiusInput = ({ radius, onChange }) => (
  <div>
    <Subheader style={styles.subheader}>
      {'Search radius'}
    </Subheader>
    <MuiThemeProvider muiTheme={getMuiTheme(styles.slider)}>
      <Slider
        defaultValue={5 / 100}
        min={0}
        max={1}
        step={5 / 100}
        value={radius / 100}
        onChange={onChange}
        sliderStyle={styles.slider}
        label={
          <div style={radius > 0 ? styles.labelStyleOuter : styles.labelStyleOuterDisabled} >
            <div style={styles.labelStyleInner}>
              {radius}
            </div>
          </div>
        }
      />
    </MuiThemeProvider>
  </div>
);

export default SearchRadiusInput;

