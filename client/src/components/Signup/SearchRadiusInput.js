import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui/Slider';

const styles = {
  subheader: {
    textTransform: 'capitalize',
  },
};

const SearchRadiusInput = ({ radius, onChange }) => (
    <div>
      <Subheader style={styles.subheader}>
        {'Search radius'}
      </Subheader>
      <span id="radius_label" style={{ color: 'black', fontWeight: 'bold' }}>{radius}</span>
      <Slider
        defaultValue={5 / 100}
        min={0}
        max={1}
        step={5 / 100}
        value={radius / 100}
        onChange={onChange}
      />
    </div>
);

export default SearchRadiusInput;

