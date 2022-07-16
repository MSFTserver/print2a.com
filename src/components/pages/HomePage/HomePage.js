/* eslint-disable react/prefer-stateless-function */
import './HomePage.scss'
import React from 'react'
import { Frame, Heading, Words, Link, Line } from 'arwes'

class HomePage extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          show={this.props.anim.entered}
        >
          <div className="homePageBox">
            <div className="homePageContents">
              <Heading node="h1">
                <div className="h1">About Print2a</div>
              </Heading>
              <div className="homePageText">
                <p>
                  <Words animate show={this.props.anim.entered}>
                    This is a collection of 3D Printed weaponry. These files
                    have been collected across various repositories to bring
                    them to one easy to find organized place. Some repos include
                    fosscad, AWCY?, det_disp and other sources far and wide!
                  </Words>
                </p>
              </div>
              <Line animate />
              <Heading node="h2">
                <div className="h2">Donate</div>
              </Heading>
              <p>
                <Words animate show={this.props.anim.entered}>
                  If you like the site and what I have put together, please
                  consider donating to help with server costs to keep this site
                  running.
                </Words>
              </p>
              <p>
                <Words layer="header" animate show={this.props.anim.entered}>
                  PayPal:
                </Words>
                <br></br>
                <Link href="http://donate.print2a.com/">
                  <Words
                    style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                    animate
                    layer="alert"
                    show={this.props.anim.entered}
                  >
                    http://donate.print2a.com/
                  </Words>
                </Link>
              </p>
              <p>
                <Words layer="header" animate show={this.props.anim.entered}>
                  BTC Address:
                </Words>
                <br></br>
                <Words
                  style={{
                    fontSize: '12px',
                    textShadow: '0 0 4px rgba(215, 24, 24, 0.65)',
                  }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  34CnFqMvsrmhZA1kDyV6iD91GV9Vn3dd94
                </Words>
              </p>
              <Line animate />
              <Heading node="h2">
                <div className="h2">Communities</div>
              </Heading>
              <Link
                href="https://matrix.to/#/#Waitingroommobilelist:matrix.org?via=matrix.org"
                target="AWCY?"
              >
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  AWCY?
                </Words>{' '}
                <i className="fa-solid fa-gun"></i>{' '}
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  Matrix
                </Words>
              </Link>
              <br />
              <Link href="https://fosscad.org/fc/chat/" target="fosscad">
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  fosscad
                </Words>{' '}
                <i className="fa-solid fa-gun"></i>{' '}
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  IRC
                </Words>
              </Link>
              <br />
              <Link
                href="https://matrix.to/#/#_oftc_#fosscad:matrix.org?via=matrix.org"
                target="fosscad"
              >
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  fosscad
                </Words>{' '}
                <i className="fa-solid fa-gun"></i>{' '}
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  Matrix Bridge to IRC
                </Words>
              </Link>
              <br />
              <Link
                href="https://chat.deterrencedispensed.com/home"
                target="det-disp"
              >
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  Deterrence Dispensed
                </Words>{' '}
                <i className="fa-solid fa-gun"></i>{' '}
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  Rocket Chat
                </Words>
              </Link>
              <Line animate />
              <Heading node="h3">
                <div className="h3">2nd Amendment</div>
              </Heading>
              <Words animate show={this.props.anim.entered}>
                “A well regulated Militia, being necessary to the security of a
                free State, the right of the people to keep and bear Arms, shall
                not be infringed.”
              </Words>
              <br></br>
              <br></br>
              <Heading node="h3">
                <div className="h3">Andrew Ford</div>
              </Heading>
              <Words animate show={this.props.anim.entered}>
                "Without either the first or second amendment, we would have no
                liberty; the first allows us to find out what's happening, the
                second allows us to do something about it! The second will be
                taken away first, followed by the first and then the rest of our
                freedoms."
              </Words>
            </div>
          </div>
        </Frame>
      </div>
    )
  }
}

export default HomePage
