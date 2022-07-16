import React from 'react'
import { Button, Frame } from 'arwes'
import Popup from 'reactjs-popup'
import './ControlledPopup.scss'

// eslint-disable-next-line react/prefer-stateless-function
function ImagePopup(props) {
  const { setShowPopup, state, theme } = props
  const { popupFile, showPopup } = state
  console.log(popupFile.ext)
  const contentStyle = {
    background: 'none',
    color: theme.color.primary.base,
    border: 'none',
    display: 'block',
    overflow: 'hidden auto',
  }
  const overlayStyle = {
    background: 'rgba(0,0,0,0.5)',
  }
  return (
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
        }}
      >
        <div className="imageButtons">
          <Button
            style={{ padding: '1vh' }}
            type="button"
            className="close"
            onClick={setShowPopup}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
          <Button
            style={{ padding: '1vh' }}
            type="button"
            className="download"
            onClick={() =>
              window.open(
                `https://print2a.com:5757/${popupFile.path}`,
                '_blank',
              )
            }
          >
            <i className="fa-solid fa-circle-arrow-down"></i>
            Download
          </Button>
        </div>
        <div
          className="image"
          style={{
            display: 'block',
            position: 'inherit',
            height: 'fit-content',
            maxHeight: '85vh',
            textAlign: 'center',
          }}
        >
          <img
            alt="Popup"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
            className="popupImage"
            src={`data:image/${popupFile.ext};base64,${popupFile.data}`}
          />
        </div>
      </Frame>
    </Popup>
  )
}

export default ImagePopup
