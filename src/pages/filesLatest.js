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
            <h1><Text>Latest Files</Text></h1>
          </header>
          {latestPosts.map((post, index) => (
            <Post
              key={index}
              audio={{ silent: index > 4 }}
              data={{ ...post, id: 'post' + index }}
            />
          ))}
          <p className={classes.seeMore}>
            <Text>See more at</Text>
            {' '}
            <Link href='/download' target='facebook'><Text>Download Section</Text></Link>
          </p>
        </Secuence>
      </Main>
    );
  }
}

export default withStyles(styles)(FilesLatest);
