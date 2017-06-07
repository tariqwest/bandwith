import React from 'react';
import List from './List';

const PreferredInstrumentsInput = ({ instruments, onChange }) => (
  <div>
      Im looking for musicians that play:
    <List
      listItems={Object.keys(instruments)}
    />
    <select
      required
      multiple
      id="preferred_instruments"
      name="preferred_instruments"
      onChange={onChange}
    >
      <option value="electric guitar">electric guitar</option>
      <option value="acoustic guitar">acoustic guitar</option>
      <option value="bass">bass</option>
      <option value="drums">drums</option>
      <option value="piano">piano</option>
      <option value="vocals">vocals</option>
      <option value="ukulele">ukulele</option>
      <option value="violin">violin</option>
      <option value="saxaphone">saxophone</option>
      <option value="trumpet">trumpet</option>
      <option value="didgeridoo">didgeridoo</option>
    </select>
  </div>
);

export default PreferredInstrumentsInput;
