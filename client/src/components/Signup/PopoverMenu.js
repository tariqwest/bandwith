import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import List from './List';

const style = {
  margin: 12,
  float: 'right',
  paddingTop: '0',
  paddingBottom: '0',
  height: 'auto',
};

class PopoverMenu extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleItemTouchTap = this.handleItemTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleItemTouchTap(event) {
    event.preventDefault();
    const id = event.currentTarget.id;
    const className = event.currentTarget.className;
    this.props.handleChip(id, className);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <Subheader>{this.props.itemName.split('_').join(' ')}
          <IconButton
            style={style}
            onTouchTap={this.handleTouchTap}
            label={`your ${this.props.className}`}
          >
            <i className="material-icons">control_point</i>
          </IconButton>
        </Subheader>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          canAutoPosition
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {this.props.listItems.map(item => (
              <MenuItem
                primaryText={item}
                key={item}
                onTouchTap={this.handleItemTouchTap}
                id={item}
                className={this.props.itemName}
              />
            ))}
          </Menu>
        </Popover>
        <List
          selectedItems={this.props.selectedItems}
          handleChip={this.props.handleChip}
          className={this.props.itemName}
        />
      </div>
    );
  }
}

export default PopoverMenu;
