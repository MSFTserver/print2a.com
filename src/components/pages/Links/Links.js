/* eslint-disable react/prefer-stateless-function */
import './Links.scss'
import React from 'react'
import { Frame, Heading, Words, Link, Line, Code } from 'arwes'

class Links extends React.Component {
  render() {
    return (
      <div className="Links">
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          show={this.props.anim.entered}
        >
          <div className="linksBox">
            <div className="linksContents">
              <Heading node="h1">
                <div className="h1">Alternative Download Links</div>
              </Heading>
              <Line />
              <div className="linksWords">
                <Heading node="h4">
                  <div className="h4">LBRY/Odysee:&nbsp;</div>
                </Heading>
                <Link href="https://odysee.com/@print2a:1">
                  <Words
                    className="h4"
                    style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                    animate
                    layer="alert"
                    show={this.props.anim.entered}
                  >
                    odysee.com/@print2a
                  </Words>
                </Link>
              </div>
              <div className="linksWords">
                <Heading node="h4">
                  <div className="h4">RSYNC:&nbsp;</div>
                </Heading>
                <Words
                  className="h4"
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  print2a.com:1776/print2a
                </Words>
              </div>
              <Line />
              <Heading node="h2">
                <div className="h2">rsync</div>
              </Heading>
              <Words>
                rsync is constantly in sync with the current repo available and
                is the best way to acquire all the files and keep them updated
                as new projects are added to save on bandwidth for you and
                server, but as a caveat I have also provided alternative
                download links that are updated on the first of every month.
              </Words>
              <br />
              <br />
              <Words>
                rsync is a utility for efficiently transfering and synchronizing
                files between a computer and an external hard drive and across
                networked computers by comparing the modification times and
                sizes of files.
              </Words>
              <Link href="https://linux.die.net/man/1/rsync" target="rsync">
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  Read More About rsync
                </Words>
              </Link>
              <Line />
              <Frame
                animate
                level={3}
                corners={6}
                layer="primary"
                show={this.props.anim.entered}
                style={{ width: 'fit-content', margin: 'auto' }}
              >
                <div className="insideFrame">
                  <Heading node="h3">
                    <div className="h3">Install:</div>
                  </Heading>
                  <Words>Red Hat based Linux systems:</Words>
                  <br />
                  <Code language="bash" className="code">
                    yum install rsync{' '}
                  </Code>
                  <br />
                  <Words>Debian based Linux systems:</Words>
                  <br />
                  <Code language="bash" className="code">
                    apt-get install rsync{' '}
                  </Code>
                </div>
              </Frame>
              <br />
              <Frame
                animate
                level={3}
                corners={6}
                layer="primary"
                show={this.props.anim.entered}
                style={{ width: 'fit-content', margin: 'auto' }}
              >
                <div className="insideFrame">
                  <Heading node="h3">
                    <div className="h3">Windows Install:</div>
                  </Heading>
                  <Words>Download and install:&nbsp;&nbsp;</Words>
                  <Link href="https://www.cygwin.com/" target="Cygwin">
                    <Words
                      style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                      animate
                      layer="alert"
                      show={this.props.anim.entered}
                    >
                      Cygwin
                    </Words>
                  </Link>
                  <br />
                  <Words>the package selection will be set to "default".</Words>
                  <br />
                  <Words>
                    in the search box in upper left corner search for "rsync".
                  </Words>
                  <br />
                  <Words>select "rsync" from the list to install it.</Words>
                </div>
              </Frame>
              <br />
              <Frame
                animate
                level={3}
                corners={6}
                layer="primary"
                show={this.props.anim.entered}
                style={{ width: 'fit-content', margin: 'auto' }}
              >
                <div className="insideFrame">
                  <Heading node="h3">
                    <div className="h3">Copy Files:</div>
                  </Heading>
                  <Code language="bash" className="code">
                    rsync -avzh rsync://print2a.com:1776/print2a
                    /Copy-To-This/Dir
                  </Code>
                </div>
              </Frame>
            </div>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Links
