import React from 'react';
import MatchListEntry from './MatchListEntry';

const MatchList = (props) => {
  return (
    <div>
      {props.matches.map((match) =>
        <MatchListEntry match={match} key={match.id} />
      )}
    </div>
  );
};

export default MatchList;
