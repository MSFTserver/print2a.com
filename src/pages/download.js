import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '../tools/withStyles';
import { Main } from '../components/Main';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text';
import { Fader } from '../components/Fader';
import { Link } from '../components/Link';

const styles = theme => ({
  root: {}
});

class Download extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;

    return (
      <Main className={classes.root}>
        <div>
          <h1><Text>Alternative Download Links</Text></h1>
          <p><Link href='http://dropbox.print2a.com' target='dropbox'>Dropbox (includes individual files repo)</Link></p>
          <p><Link href='http://drive.print2a.com' target='drive'>Google Drive</Link></p>
          <p><Link href='http://mega.print2a.com' target='megaupload'>Mega Upload</Link></p>
          <p><Link href='http://lbry.print2a.com' target='lbry'>lbry</Link></p>
          <h1><Text>Rsync Enabled:</Text></h1>
          <p><Text>beta.print2a.com:1776</Text></p>
        </div>
      </Main>
    );
  }
}

export default withStyles(styles)(Download);
