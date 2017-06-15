import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';

const styles = {
  card: {
    margin: '0px 5px 5px 5px',
    height: 78,
    width: '100%',
  },
  cardHeader: {
    padding: '16px 0px 16px 16px',
    height: 78,
  },
  cardHeaderTitle: {
    paddingTop: 10,
    paddingRight: 0,
  },
  column: { paddingRight: 2, paddingLeft: 2 },
  row: { width: '100%' },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class InfluenceList extends Component {
  constructor(props) {
    super(props);
    this.handleChipDelete = this.handleChipDelete.bind(this);
  }

  handleChipDelete(item) {
    this.props.handleChip(item);
  }

  render() {
    if (this.props.selectedItems.length) {
      const leftInfluences = this.props.selectedItems.filter((item, index) => index % 2 === 0);
      const rightInfluences = this.props.selectedItems.filter((item, index) => index % 2 === 1);

      return (
        <div style={styles.wrapper}>
          <Row style={styles.row}>
            <Col xs={12} sm={6} style={styles.column}>
              {leftInfluences.map(item => (
                <Card style={styles.card} key={item.name} id="container-influence">
                  <CardHeader
                    id="base"
                    style={styles.cardHeader}
                    titleStyle={styles.cardHeaderTitle}
                    title={item.name}
                    avatar={item.img}
                  />
                  <div id="overlay-influence" onClick={() => this.handleChipDelete(item.name)}>
                    <i className="material-icons">clear</i>
                  </div>
                </Card>
                ),
              )}
            </Col>
            <Col xs={12} sm={6} style={styles.column}>
              {rightInfluences.map(item => (
                <Card style={styles.card} key={item.name} id="container-influence">
                  <CardHeader
                    id="base"
                    style={styles.cardHeader}
                    titleStyle={styles.cardHeaderTitle}
                    title={item.name}
                    avatar={item.img}
                  />
                  <div id="overlay-influence" onClick={() => this.handleChipDelete(item.name)}>
                    <i className="material-icons">clear</i>
                  </div>
                </Card>),
              )}
            </Col>
          </Row>
        </div>
      );
    }
    return (<div style={styles.wrapper} />);
  }
}

export default InfluenceList;
