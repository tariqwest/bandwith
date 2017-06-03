import React from 'react';
import List from './List';

const PreferredGenresInput = ({ genres, onChange }) => (
  <div>
    <p>
      Im looking for musicians that like:
    <List
      listItems={Object.keys(genres)}
    />
    </p>
    <p>
      <select
        required
        multiple
        id="preferred_genres"
        name="preferred_genres"
        onChange={onChange}
      >
        <option value="rock">rock</option>
        <option value="jazz">jazz</option>
        <option value="blues">blues</option>
        <option value="folk">folk</option>
        <option value="reggae">reggae</option>
        <option value="country">country</option>
        <option value="pop">pop</option>
        <option value="punk">punk</option>
        <option value="metal">metal</option>
        <option value="edm">edm</option>
        <option value="r&b">r&b</option>
        <option value="funk">funk</option>
        <option value="rap">rap</option>
        <option value="disco">disco</option>
        <option value="pop">pop</option>
      </select>
    </p>
  </div>
);

export default PreferredGenresInput;
