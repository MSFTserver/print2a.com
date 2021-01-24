import React from 'react';
import PropTypes from 'prop-types';

import latestPosts from '../data/filesLatest';
import { withStyles } from '../tools/withStyles';
import { Link } from '../components/Link';
import { Main } from '../components/Main';
import { Post } from '../components/Post';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text';

const styles = theme => ({
  root: {},
  seeMore: {
    marginTop: 20
  }
});

class FilesLatest extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;

    return (
      <Main className={classes.root}>
        <Secuence stagger>
          <header>
            <h1><Text>COMING SOON</Text></h1>
          </header>
        </Secuence>
      </Main>
    );
  }
}

export default withStyles(styles)(FilesLatest);
