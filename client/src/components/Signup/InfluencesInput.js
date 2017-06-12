import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import InfluenceList from './InfluenceList';

const style = {
  margin: 12,
};

const InfluenceInput = ({ influence, influences, handleChange, onClick, handleChip }) => (
  <div>
    <Row>
      <Col xs={12} sm={8} >
        <Subheader>
          Influences
          <TextField
            floatingLabelText="musical influence"
            fullWidth
            id="influence"
            type="text"
            name="influence"
            value={influence}
            onChange={handleChange}
          >
            <IconButton
              onTouchTap={onClick}
              label="Add Influence"
              style={style}
              name="influences"
              form="influences"
            >
              <i className="material-icons">control_point</i>
            </IconButton>
          </TextField>
        </Subheader>
      </Col>
      <Col xs={12}>
        <InfluenceList
          handleChip={handleChip}
          selectedItems={influences}
          influence={influence}
          className="influences"
        />
      </Col>
    </Row>
  </div>
);

export default InfluenceInput;
