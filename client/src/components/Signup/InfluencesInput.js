import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import InfluenceList from './InfluenceList';

const style = {
  margin: 12,
};

class InfluenceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
    };
    this.handleShowInput = this.handleShowInput.bind(this);
  }

  handleShowInput() {
    this.setState({ showInput: !this.state.showInput });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={8} >
            <Subheader>
              Influences
                <IconButton
                  onTouchTap={this.handleShowInput}
                  label="Add Influence"
                  style={style}
                  name="influences"
                  form="influences"
                >
                  <i className="material-icons">control_point</i>
                </IconButton>
              { this.state.showInput ?
                <div>
                  <TextField
                    floatingLabelText="musical influence"
                    fullWidth
                    id="influence"
                    type="text"
                    name="influence"
                    value={this.props.influence}
                    onChange={this.props.handleChange}
                  />
                  <RaisedButton
                    onTouchTap={() => { this.props.onClick(); this.handleShowInput(); }}
                    label="add"
                    style={style}
                    name="influences"
                    form="influences"
                  />
                </div>
                : null
              }
            </Subheader>
          </Col>
          <Col xs={12}>
            <InfluenceList
              handleChip={this.props.handleChip}
              selectedItems={this.props.influences}
              influence={this.props.influence}
              className="influences"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default InfluenceInput;
