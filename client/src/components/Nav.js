import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, slideIndex: 0 };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentWillMount() {
    if (location.pathname === '/profile') {
      this.setState({
        slideIndex: 0,
      });
    } else if (location.pathname === '/results') {
      this.setState({
        slideIndex: 1,
      });
    } else if (location.pathname === '/connections') {
      this.setState({
        slideIndex: 2,
      });
    }
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  changeTab(event) {
    this.setState({
      slideIndex: event,
    });
  }

  render() {
    const styles = {
      default_tab:{
        color: '#6d6d6d',
      },
      active_tab:{
        color: '#fff',
      },
    };

    styles.tab = [];
    styles.tab[0] = styles.default_tab;
    styles.tab[1] = styles.default_tab;
    styles.tab[2] = styles.default_tab;
    styles.tab[this.state.slideIndex] = styles.active_tab;

    if (this.props.isAuthenticated) {
      return (
        <div>
          <AppBar
            title={<NavLink exact to="/" >Bandwith</NavLink>}
            onRightIconButtonTouchTap={this.handleToggle}
            showMenuIconButton={false}
            style={{ backgroundColor: 'black', fontFamily: 'Pacifico' }}
            iconElementRight={<IconButton><MoreVertIcon /></IconButton>}
            iconStyleRight={{ color: 'white' }}
          />
          <Drawer
            docked={false}
            open={this.state.open}
            openSecondary={true}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem primaryText="Logout" containerElement={<Link to="/logout" />} />
          </Drawer>
          <Tabs onChange={this.changeTab} value={this.state.slideIndex} inkBarStyle={{ background: '#ff5bff' }} tabItemContainerStyle={{ background: 'black' }}>
            <Tab
              style={styles.tab[0]}
              value={0}
              label={<i className="material-icons">account_circle</i>}
              containerElement={<Link to="/profile" />}
            />
            <Tab
              style={styles.tab[1]}
              value={1}
              label={<i className="material-icons">people</i>}
              containerElement={<Link to="/results" />}
            />
            <Tab
              style={styles.tab[2]}
              value={2}
              label={<i className="material-icons">favorite</i>}
              containerElement={<Link to="/connections" />}
            />
          </Tabs>
        </div>
      );
    }
    return (
      <div>
        <AppBar
          title={<NavLink exact to="/" >Bandwith</NavLink>}
          showMenuIconButton={false}
          style={{ backgroundColor: 'black', fontFamily: 'Pacifico' }}
          iconElementRight={<FlatButton label="Login" containerElement={<Link to="/login" />} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(Nav);
