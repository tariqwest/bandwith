import React from 'react';
import List from './List';

const PreferredInstrumentsInput = ({ instruments, onChange }) => (
  <div>
    <p>
      Im looking for musicians that play:
    <List
      listItems={Object.keys(instruments)}
    />
    </p>
    <p>
      <select
        required
        multiple
        id="preferred_instruments"
        name="preferred_instruments"
        onChange={onChange}
      >
        <option value="electricGuitar">electric guitar</option>
        <option value="acousticGuitar">acoustic guitar</option>
        <option value="bass">bass</option>
        <option value="drums">drums</option>
        <option value="piano">piano</option>
        <option value="vocals">vocals</option>
        <option value="ukulele">ukulele</option>
        <option value="violin">violin</option>
        <option value="saxaphone">saxaphone</option>
        <option value="trumpet">trumpet</option>
        <option value="didgeridoo">didgeridoo</option>
      </select>
    </p>
  </div>
);

export default PreferredInstrumentsInput;
