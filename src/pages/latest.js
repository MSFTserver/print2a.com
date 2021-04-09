import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '../tools/withStyles';
import { Link } from '../components/Link';
import { Main } from '../components/Main';
import { Post } from '../components/Post';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text';
import GetLatest from '/static/latest.js';

const styles = theme => ({
  root: {}
});

class Latest extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;
    return (
      <Main className={classes.root}>
        <Secuence stagger>
          <header>
            <h1><Text>Latest Files</Text></h1>
          </header>
          <GetLatest />
        </Secuence>
      </Main>
    )
  }
}

export default withStyles(styles)(Latest);
