import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '../tools/withStyles';
import { Main } from '../components/Main';
import { Secuence } from '../components/Secuence';
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
        <pre>
          <Secuence stagger>
            {JSON.stringify(projects, null, 4)}
          </Secuence>
        </pre>
      </Main>
    );
  }
}

export default withStyles(styles)(FolderBrowser);
