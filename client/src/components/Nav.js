import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <AppBar
            title={<NavLink exact to="/" >BandWith</NavLink>}
            onLeftIconButtonTouchTap={this.handleToggle}
            style={{ backgroundColor: 'black' }}
            iconElementRight={<FlatButton
              label="Logout"
              containerElement={<Link to="/logout" />}
            />}
          />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />} />
            <MenuItem primaryText="Logout" containerElement={<Link to="/logout" />} />
          </Drawer>
          <FlatButton label="Profile" containerElement={<Link to="/profile" />} />
          <FlatButton label="Connections" containerElement={<Link to="/connections" />} />
          <FlatButton label="Musicians" containerElement={<Link to="/results" />} />
        </div>
      );
    } else {
      return (
        <div>
          <AppBar
            title={<NavLink exact to="/" >BandWith</NavLink>}
            onLeftIconButtonTouchTap={this.handleToggle}
            style={{ backgroundColor: 'black' }}
            iconElementRight={<FlatButton label="Login" containerElement={<Link to="/login" />} />}
          />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem primaryText="Login" containerElement={<Link to="/login" />} />
          </Drawer>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(Nav);
