import React from 'react';
import AppendHead from 'react-append-head';
import PropTypes from 'prop-types';

import { withStyles } from '../tools/withStyles';
import { Link } from '../components/Link';
import { Main } from '../components/Main';
import { Post } from '../components/Post';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text';

const styles = theme => ({
  root: {}
});

class Latest extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;
    const projects = GetLatest();
    return (
      <Main className={classes.root}>
      <AppendHead>
        <script name="GetLatest" src="/static/latest.js"></script>
      </AppendHead>
        <Secuence stagger>
        <header>
          <h1><Text>Latest Files</Text></h1>
        </header>
        {
          projects.map((file, index) => (
          <Post
            key={index}
            audio={{ silent: index > 4 }}
            data={{ ...file, id: "file" + index }}
          />
        ))}
        </Secuence>
      </Main>
    );
  }
}

export default withStyles(styles)(Latest);
