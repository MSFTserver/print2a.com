import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  Arwes,
  Puffs,
  SoundsProvider,
  createSounds,
  Link,
  Footer,
  withSounds,
} from 'arwes'
import { Toaster } from 'react-hot-toast'
import './App.scss'

import NavBar from '../components/shared/NavBar/NavBar'
import HomePage from '../components/pages/HomePage/HomePage'
import Browse from '../components/pages/Browse/Browse'
import Latest from '../components/pages/Latest/Latest'
import Links from '../components/pages/Links/Links'
import ModelViewer from '../components/pages/ModelViewer/ModelViewer'
import background from '../helpers/assets/images/background.png'
import glow from '../helpers/assets/images/glow.png'
import theme from '../helpers/Theme'
import mySounds from '../helpers/Sounds'

function App() {
  const resources = {
    bg: background,
    pattern: glow,
  }

  const [state, setState] = useState({
    showPage: 'home',
    showPopup: false,
    popupFile: {
      path: null,
      ext: null,
      name: null,
      data: null,
    },
    pdfPage: 1,
  })

  const setShowPage = (page) => {
    setState((prev) => ({
      ...prev,
      showPage: page,
    }))
  }

  const upPage = () => {
    setState((prev) => ({
      ...prev,
      pdfPage: prev.pdfPage + 1,
    }))
  }

  const downPage = () => {
    setState((prev) => ({
      ...prev,
      pdfPage: prev.pdfPage - 1,
    }))
  }

  const setShowPopup = () => {
    setState((prev) => ({
      ...prev,
      showPopup: !prev.showPopup,
    }))
  }

  const setPopupFile = (fileName, filePath, fileExt, fileData) => {
    setState((prev) => ({
      ...prev,
      popupFile: {
        path: filePath,
        name: fileName,
        ext: fileExt,
        data: fileData,
      },
    }))
  }
  const createdTheme = createTheme(theme)
  const createdSounds = createSounds(mySounds)
  const MyNav = withSounds()((props) => <NavBar {...props} />)
  return (
    <ThemeProvider theme={createdTheme}>
      <SoundsProvider sounds={createdSounds}>
        <Arwes
          resources={resources}
          animate
          show
          background={{
            small: background,
            medium: background,
            large: background,
            xlarge: background,
          }}
          pattern={glow}
        >
          {(anim) => (
            <div className="App">
              <Toaster position="bottom-right" gutter={16} />
              <Router>
                <MyNav anim={anim} setShowPage={setShowPage} state={state} />
                <Puffs>
                  <Routes>
                    <Route path="/" element={<HomePage anim={anim} />} />
                    <Route path="/latest" element={<Latest anim={anim} />} />
                    <Route path="/links" element={<Links anim={anim} />} />
                    <Route
                      path="/browse/*"
                      element={
                        <Browse
                          anim={anim}
                          state={state}
                          setShowPopup={setShowPopup}
                          setPopupFile={setPopupFile}
                          upPage={upPage}
                          downPage={downPage}
                          theme={createdTheme}
                        />
                      }
                    />
                    <Route
                      path="/modelViewer"
                      element={<ModelViewer anim={anim} />}
                    />
                  </Routes>
                </Puffs>
                <div className="footer">
                  <Footer
                    style={{ position: 'fixed', bottom: 0, width: '100%' }}
                  >
                    <div className="footerContents">
                      <Link
                        href="https://github.com/MSFTserver/print2a.com"
                        alt="Arwes theme"
                      >
                        - Open Source -
                      </Link>
                      <Link
                        href="https://github.com/arwesjs/arwes"
                        alt="Arwes theme"
                      >
                        Powered By Arwes
                      </Link>
                    </div>
                  </Footer>
                </div>
              </Router>
            </div>
          )}
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  )
}

export default App
