import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import MatchList from './MatchList';

const styles = {
  pageContainer: {
    // left and right margins
    // top and bottom padding if necesarry around multiple cards
    marginTop: '6px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  cardContainer: {
    // spacing between cards on a page
    marginTop: '6px',
    marginBottom: '6px',
  },
};

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        <div className="bump-tab-bar" />
        <Row>
          <Col xs={12} sm={8} smOffset={2}>
            <div style={styles.cardContainer} zDepth={1}>
              <MatchList />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ userId: state.auth.userId });

export default connect(mapStateToProps)(Matches);
