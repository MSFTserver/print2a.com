/* eslint-disable react/prefer-stateless-function */
import './Browse.scss'
import React from 'react'
import { Frame, Heading, Appear } from 'arwes'
import ChonkyBrowse from './ChonkyBrowse'

function Browse(props) {
  return (
    <div className="Browse">
      <Frame
        animate
        level={3}
        corners={6}
        layer="primary"
        show={props.anim.entered}
      >
        <div className="browseBox">
          <div className="browseContents">
            <ChonkyBrowse {...props} />
          </div>
        </div>
      </Frame>
    </div>
  )
}

export default Browse
