import React from 'react';
import InstrumentListEntry from './InstrumentListEntry';

const InstrumentList = ({ instruments }) => (
  <span className="instrument-list">
    {instruments.map(instrument =>
      (<InstrumentListEntry
        key={instrument}
        instrument={instrument}
      />),
    )}
  </span>
);

export default InstrumentList;
