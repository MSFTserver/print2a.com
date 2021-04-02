import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import Noty for nice file open notifications
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/relax.css";

import { withStyles } from '../tools/withStyles';
import { Main } from '../components/Main';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text';
import ChonkyBrowse from '/static/ChonkyBrowse.js';

const styles = theme => ({
  root: {}
});

class Browse extends React.Component {

  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;
    return (
      <Main className={classes.root}>
        <Secuence stagger>
          <ChonkyBrowse />
        </Secuence>
      </Main>
    )
  }
}

export default withStyles(styles)(Browse);
