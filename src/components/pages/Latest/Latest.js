/* eslint-disable react/prefer-stateless-function */
import './Latest.scss'
import React from 'react'
import { Frame, Header, Heading, Link, Words, Row, Col } from 'arwes'
import GetLatest from './GetLatest'

function Latest(props) {
  return (
    <div className="Latest">
      <Frame
        animate
        level={3}
        corners={6}
        layer="primary"
        show={props.anim.entered}
      >
        <div className="latestBox">
          <Header style={{ paddingTop: 20 }} animate>
            <Heading node="h1">
              <div className="h1">Latest Projects</div>
            </Heading>
          </Header>
          <br />
          <GetLatest {...props} style={{ marginBottom: 20 }} />
        </div>
      </Frame>
    </div>
  )
}

export default Latest
