import React from 'react';
import List from './List';

const UserInstrumentsInput = ({ instruments, onChange }) => (
  <div>
    <p>
    Your instruments:
    <List
      listItems={Object.keys(instruments)}
      onChange={onChange}
    />
    </p>
    <p>
      <select
        required
        multiple
        id="instruments"
        name="instruments"
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
        <option value="saxaphone">saxaphone</option>
        <option value="trumpet">trumpet</option>
        <option value="didgeridoo">didgeridoo</option>
      </select>
    </p>
  </div>
);

export default UserInstrumentsInput;
