import React from 'react'
import Popup from 'reactjs-popup'
import './ControlledPopup.scss'
import { Button, Frame } from 'arwes'
import TextPopup from './Text'
import ImagePopup from './Image'

// eslint-disable-next-line react/prefer-stateless-function
function ControlledPopup(props) {
  const { setShowPopup, state, theme } = props
  const { popupFile, showPopup } = state
  const contentStyle = {
    background: 'none',
    color: theme.color.primary.base,
    border: 'none',
    height: '85vh',
    display: 'block',
    overflow: 'hidden auto',
  }
  const overlayStyle = {
    background: 'rgba(0,0,0,0.5)',
  }
  if (['md', 'txt', 'pdf'].includes(popupFile.ext?.toLowerCase())) {
    return <TextPopup {...props} />
  }
  if (['png', 'jpg'].includes(popupFile.ext?.toLowerCase())) {
    return <ImagePopup {...props} />
  }
  return (
    <div className="ControlledPopup">
      <Popup
        open={showPopup}
        closeOnDocumentClick={false}
        {...{ overlayStyle, contentStyle }}
      >
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          show
          theme={theme}
          style={{
            backgroundColor: theme.background.primary.level0,
            padding: '1vh',
          }}
        >
          <Button type="button" className="close" onClick={setShowPopup}>
            <i className="fa-solid fa-xmark"></i>
          </Button>
          File Not Supported --&gt; Right Click to Download
        </Frame>
      </Popup>
    </div>
  )
}

export default ControlledPopup
