import React from 'react';

const InstrumentListEntry = ({ instrument }) => (
  <span className="instrument-list">
    {` ${instrument}, `}
  </span>
);

export default InstrumentListEntry;
