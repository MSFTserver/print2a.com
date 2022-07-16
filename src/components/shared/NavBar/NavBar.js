/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import './NavBar.scss'
import React, { useState } from 'react'
import { Button, Header, Heading, Row, Words } from 'arwes'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

function NavBar(props) {
  const location = useLocation()
  const [menuActive, setMenuActive] = useState(false)

  const mobileMenuClicked = () => {
    if (!menuActive) {
      document.getElementById('navLinks').style.display = 'block'
      setMenuActive(true)
    } else {
      document.getElementById('navLinks').style.display = 'none'
      setMenuActive(false)
    }
  }
  const { setShowPage, sounds, anim } = props
  const showPage = location.pathname.replace('/', '')

  return (
    <div className="NavBar">
      <Header animate show={anim.entered}>
        <nav className="container-fluid navbar">
          <Heading>
            Print2a
            <div id="mobileMenu" onClick={mobileMenuClicked}>
              <li className="fa fa-bars" title="Menu" />
            </div>
          </Heading>
          <Row className="row wrap mr-1" id="navLinks" col s={12}>
            <Link to="/">
              <Button
                className="navToButton"
                animate
                disabled={!showPage}
                show={anim.entered}
                onClick={() => setShowPage('home')}
                onMouseEnter={() => sounds.hover.play()}
              >
                <Words className="navToText">Home</Words>
              </Button>
            </Link>
            <Link to="/latest">
              <Button
                className="navToButton"
                animate
                disabled={showPage === 'latest'}
                show={anim.entered}
                onClick={() => setShowPage('latest')}
                onMouseEnter={() => sounds.hover.play()}
              >
                <Words className="navToText">Latest</Words>
              </Button>
            </Link>
            <Link to="/links">
              <Button
                className="navToButton"
                animate
                disabled={showPage === 'links'}
                show={anim.entered}
                onClick={() => setShowPage('links')}
                onMouseEnter={() => sounds.hover.play()}
              >
                <Words className="navToText">Links</Words>
              </Button>
            </Link>
            <Link to="/browse">
              <Button
                className="navToButton"
                animate
                disabled={
                  showPage === 'browse' || showPage.startsWith('browse/')
                }
                show={anim.entered}
                onClick={() => setShowPage('browse')}
                onMouseEnter={() => sounds.hover.play()}
              >
                <Words className="navToText">Browse</Words>
              </Button>
            </Link>
          </Row>
        </nav>
      </Header>
    </div>
  )
}

NavBar.propTypes = {
  setShowPage: PropTypes.func.isRequired,
  sounds: PropTypes.any.isRequired,
  anim: PropTypes.any.isRequired,
}

export default NavBar
