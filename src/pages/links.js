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

class Links extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;

    return (
      <Main className={classes.root}>
        <div className='downloadLinks'>
          <h1><Text>Alternative Download Links</Text></h1>
          <p><Link href='http://dropbox.print2a.com' target='dropbox'><Text>Dropbox (includes individual files repo)</Text></Link></p>
          <p><Link href='http://drive.print2a.com' target='drive'><Text>Google Drive</Text></Link></p>
          <p><Link href='http://mega.print2a.com' target='megaupload'><Text>Mega Upload</Text></Link></p>
          <p><Link href='http://lbry.print2a.com' target='lbry'><Text>lbry</Text></Link></p>
          <p><Text>Rsync Enabled: print2a.com:1776/print2a</Text></p>
          <Fader>
          <h1><Text>rsync?</Text></h1>
          <p><Text>rsync is a utility for efficiently transferring and synchronizing files between a computer and an external hard drive and across networked computers by comparing the modification times and sizes of files.</Text></p>
          <p><Link href='https://linux.die.net/man/1/rsync' target='rsync'>Read More About rsync</Link></p>
          <h3><Text>Install:</Text></h3>
          <p><Text># yum install rsync (On Red Hat based Linux systems)</Text></p>
          <p><Text># apt-get install rsync (On Debian based Linux systems)</Text></p>
          <p><Text>Windows Install (!ADV USERS!) :</Text></p>
          <p><Text>Download and install <Link href="https://www.cygwin.com/">Cygwin</Link></Text></p>
          <p><Text>Copy Files From Print2a Server:</Text></p>
          <p><Text># rsync -avzh rsync://beta.print2a.com:1776/print2a /Copy-To-This/Dir</Text></p>
          </Fader>
        </div>
        <div className='communityLinks'>
        <h1><Text>Communities</Text></h1>
        <p><Link href='https://matrix.to/#/#Waitingroommobilelist:matrix.org?via=matrix.org' target='AWCY?'><Text>AWCY? | Matrix |</Text></Link></p>
        <p><Link href='https://fosscad.org/fc/chat/' target='fosscad'><Text>fosscad | IRC |</Text></Link></p>
        <p><Link href='https://matrix.to/#/#_oftc_#fosscad:matrix.org?via=matrix.org' target='fosscad'><Text>fosscad | Matrix Bridge to IRC |</Text></Link></p>
        <p><Link href='https://chat.deterrencedispensed.com/home' target='det-disp'><Text>Deterrence Dispensed | Rocket Chat |</Text></Link></p>
        <p><Text>Add Your Community Here Contact HostsServer (Formerly MSFTserver)</Text></p>
        </div>
      </Main>
    );
  }
}

export default withStyles(styles)(Links);
