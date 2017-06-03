import React from 'react';
import List from './List';

const InfluenceInput = ({ influence, influences, handleChange, onClick }) => (
  <div>
    <p>
      Add a musical influence:
    <List
      listItems={Object.keys(influences)}
    />
    </p>
    <p>
      <input
        id="influence"
        type="text"
        name="influence"
        value={influence}
        onChange={handleChange}
      />
      <button
        type="button"
        form="influences"
        name="influences"
        onClick={onClick}
      >
        Add Influence
      </button>
    </p>
  </div>
);

export default InfluenceInput;
