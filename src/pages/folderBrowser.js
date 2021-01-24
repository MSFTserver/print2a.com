import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '../tools/withStyles';
import { Main } from '../components/Main';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text'
import projects from '/static/projects.json';

const styles = theme => ({
  root: {}
});

class FolderBrowser extends React.Component {
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

export default withStyles(styles)(FolderBrowser);
