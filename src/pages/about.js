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

class About extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;

    return (
      <Main className={classes.root}>
        <div className='aboutPage'>
          <h1><Text>Print2a</Text></h1>
          <p><Text>This is a collection of 3D Printed weaponry. These files have been collected across various repositories to bring them to one easy to find organized place. some repos include fosscad, AWCY?, det_disp and other sources far and wide!</Text></p>
          <h2><Text>Donate</Text></h2>
          <p><Text>if you like the site and what i have put together, please consider donating to help with server costs to keep this site running, anything helps as costs are quite low right now.</Text></p>
          <div style={{lineHeight:"0px"}}>
          <p><Text>PayPal:</Text></p><p><Link href="http://donate.print2a.com" target="PayPal"><Text>http://donate.print2a.com</Text></Link></p><br style={{lineHeight:'20px'}}></br>
          <p><Text>BTC Address:</Text></p><p><Text>34CnFqMvsrmhZA1kDyV6iD91GV9Vn3dd94</Text></p><br style={{lineHeight:'20px'}}></br>
          <p><Text>XLM Address:</Text></p><p style={{fontSize:"10px"}}><Text>GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37</Text></p><br style={{lineHeight:'10px'}}></br>
          <p><Text>XLM Must be sent with memo ID below for me to receive</Text></p><br style={{lineHeight:'10px'}}></br>
          <p><Text>XLM Memo ID:</Text></p><p><Text>3556957568</Text></p><br style={{lineHeight:'20px'}}></br>
          </div>
          <Fader>
          <h2><Text>Github?</Text></h2>
          <p><Text>this repo has been removed from github due to issues with the large files and my ever increasing bandwidth from you CHADS cloning the repo, due to some GitHub oversights everytime some clones or downloads this repo it adds to my bandwidth, additionally everytime the cloned repo is changed on the user end it adds to the Main repo owners bandwidth and storage wich was hell to find out so alas this repo is gone from github.</Text></p>
          </Fader>
          <h2><Text>License</Text></h2>
          <li> These files are released open source.</li>
          <li> Fuck COPYRIGHTS.</li><br style={{lineHeight:'20px'}}></br>
          <h2><Text>Site Admin</Text></h2>
          <li>HostsServer (Formerly MSFTserver)</li>
        </div>
      </Main>
    );
  }
}

export default withStyles(styles)(About);
