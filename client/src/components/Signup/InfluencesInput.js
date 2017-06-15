import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import InfluenceList from './InfluenceList';

const styles = {
  iconButton: {
    margin: 12,
    float: 'right',
    paddingTop: '0',
    paddingBottom: '0',
    height: 'auto',
  },
  influencesButton: {
    marginTop: '25px',
  },
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
      <Row>
        <Col xs={12} >
          <Subheader>
            Influences
              <IconButton
                onTouchTap={this.handleShowInput}
                label="Add Influence"
                style={styles.iconButton}
                name="influences"
                form="influences"
              >
                <i className="material-icons">control_point</i>
              </IconButton>
          </Subheader>
          { this.state.showInput ?
            <Row>
              <Col xs={9}>
                <TextField
                  floatingLabelText="musical influence"
                  fullWidth
                  id="influence"
                  type="text"
                  name="influence"
                  value={this.props.influence}
                  onChange={this.props.handleChange}
                  floatingLabelFocusStyle={{ color: 'rgb(255, 64, 129)' }}
                  underlineFocusStyle={{ borderBottomColor: 'rgb(255, 64, 129)' }}
                />
              </Col>
              <Col xs={3}>
                <RaisedButton
                  fullWidth
                  label="add"
                  style={styles.influencesButton}
                  name="influences"
                  form="influences"
                  onTouchTap={() => { this.props.onClick(); this.handleShowInput(); }}
                />
              </Col>
            </Row>
          : null
        }
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
    );
  }
}
export default InfluenceInput;
