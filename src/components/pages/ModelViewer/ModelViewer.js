/* eslint-disable react/prefer-stateless-function */
import './ModelViewer.scss'
import React, { useEffect } from 'react'
import { Frame, Line, Words, Button } from 'arwes'
import * as THREE from 'three'
import {
  OrbitControls,
  STLExporter,
  STLLoader,
  OBJLoader,
  signedVolumeOfTriangle,
} from './three'

const StringERROR =
  'ERROR: Please check that the model is a STL, OBJ or 3DS model.'
const buttonStyle = { style: { padding: '1vh' } }
const brStyle = { margin: '5px 0px' }

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  100000,
)

let vol = 0

function vh(v) {
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  )
  return (v * h) / 100
}

function vw(v) {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0,
  )
  return (v * w) / 100
}

const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setClearColor(0x000000, 0)
renderer.setSize(vw(100), vh(100))

let controls
let mesh
let height
let width
let depth
let pauseSpin = 1
let pauseSpinTimeout

const densityDefault = parseFloat('1.05')
const filamentCostDefault = parseFloat('20.00')
const filamentDiameterDefault = parseFloat('1.75')
const printSpeedDefault = parseFloat('150.00')

let density = densityDefault
let filamentCost = filamentCostDefault
let filamentDiameter = filamentDiameterDefault
let printSpeed = printSpeedDefault

const getRandomValue = (min, max) => Math.random() * (max - min) + min

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function updateCost() {
  let volumeFinal = vol / 1000
  volumeFinal = volumeFinal.toFixed(2)
  let weightFinal = volumeFinal * density
  weightFinal = weightFinal.toFixed(2)
  let finalCost = (weightFinal * filamentCost) / 1000
  finalCost = parseFloat(finalCost).toFixed(2)
  document.getElementById('costValue').innerHTML = finalCost
}

function moreDensity(inputDensity, increaseDensity = null) {
  const densityInput = document.getElementById('densityValue')
  if (inputDensity !== null) {
    density = parseFloat(inputDensity)
  } else if (increaseDensity && inputDensity === null) {
    density = parseFloat(density) + parseFloat('0.01')
    densityInput.value = density.toFixed(2)
  } else if (increaseDensity !== null && inputDensity === null) {
    density = parseFloat(density) - parseFloat('0.01')
    densityInput.value = density.toFixed(2)
  } else {
    density = parseFloat('0.01')
    densityInput.value = density.toFixed(2)
  }

  if (density > 100) {
    density = parseFloat('100.00')
    densityInput.value = density.toFixed(2)
  } else if (density < 0) {
    density = parseFloat('0.00')
    densityInput.value = density.toFixed(2)
  }

  let heightFinal = height / 10
  heightFinal = heightFinal.toFixed(2)
  let widthFinal = width / 10
  widthFinal = widthFinal.toFixed(2)
  let depthFinal = depth / 10
  depthFinal = depthFinal.toFixed(2)
  let volumeFinal = vol / 1000
  volumeFinal = volumeFinal.toFixed(2)
  let weightFinal = volumeFinal * density
  weightFinal = weightFinal.toFixed(2)
  document.getElementById('weightValue').innerHTML = weightFinal
  document.getElementById('volumeValue').innerHTML = volumeFinal
  document.getElementById('widthValue').innerHTML = widthFinal
  document.getElementById('depthValue').innerHTML = depthFinal
  document.getElementById('heightValue').innerHTML = heightFinal
  updateCost()
}

function moreCost(inputCost, increaseCost = null) {
  const costKilogramInput = document.getElementById('costKilogramValue')
  if (inputCost !== null) {
    filamentCost = parseFloat(inputCost)
  } else if (increaseCost && inputCost === null) {
    filamentCost = parseFloat(filamentCost) + parseFloat('1.00')
    costKilogramInput.value = filamentCost.toFixed(2)
  } else if (increaseCost !== null && inputCost === null) {
    filamentCost = parseFloat(filamentCost) - parseFloat('1.00')
    costKilogramInput.value = filamentCost.toFixed(2)
  } else {
    filamentCost = parseFloat('20.00')
    costKilogramInput.value = filamentCost.toFixed(2)
  }

  if (filamentCost > 1000) {
    filamentCost = parseFloat('1000.00')
    costKilogramInput.value = filamentCost.toFixed(2)
  } else if (filamentCost < 0) {
    filamentCost = parseFloat('0.00')
    costKilogramInput.value = filamentCost.toFixed(2)
  }
  updateCost()
}

function moreDiameter(inputDiameter, increaseDiameter = null) {
  const filamentDiameterInput = document.getElementById('diameterValue')
  if (inputDiameter !== null) {
    filamentDiameter = parseFloat(inputDiameter)
  } else if (increaseDiameter && inputDiameter === null) {
    filamentDiameter = parseFloat(filamentDiameter) + parseFloat('0.01')
    filamentDiameterInput.value = filamentDiameter.toFixed(2)
  } else if (increaseDiameter !== null && inputDiameter === null) {
    filamentDiameter = parseFloat(filamentDiameter) - parseFloat('0.01')
    filamentDiameterInput.value = filamentDiameter.toFixed(2)
  } else {
    filamentDiameter = parseFloat('1.75')
    filamentDiameterInput.value = filamentDiameter.toFixed(2)
  }

  if (filamentDiameter > 10) {
    filamentDiameter = parseFloat('10.00')
    filamentDiameterInput.value = filamentDiameter.toFixed(2)
  } else if (filamentDiameter < 0) {
    filamentDiameter = parseFloat('0.00')
    filamentDiameterInput.value = filamentDiameter.toFixed(2)
  }

  let filamentLength = parseFloat(
    (((vol / (filamentDiameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)
  filamentLength = parseFloat(filamentLength).toFixed(0)

  let hours = Math.floor(filamentLength / printSpeed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filamentLength / printSpeed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  if (minutes === 0) {
    minutes = 1
  }
  document.getElementById('lengthValue').innerHTML = filamentLength
  document.getElementById('hoursValue').innerHTML = hours
  document.getElementById('minutesValue').innerHTML = minutes
}

function moreSpeed(inputSpeed, increaseSpeed) {
  const printSpeedInput = document.getElementById('printSpeedValue')
  if (inputSpeed !== null) {
    printSpeed = parseFloat(inputSpeed)
  } else if (increaseSpeed && inputSpeed === null) {
    printSpeed = parseFloat(printSpeed) + parseFloat('5.00')
    printSpeedInput.value = printSpeed.toFixed(2)
  } else if (increaseSpeed !== null && inputSpeed === null) {
    printSpeed = parseFloat(printSpeed) - parseFloat('5.00')
    printSpeedInput.value = printSpeed.toFixed(2)
  } else {
    printSpeed = parseFloat('150.00')
    printSpeedInput.value = printSpeed.toFixed(2)
  }

  if (printSpeed > 1000) {
    printSpeed = parseFloat('1000.00')
    printSpeedInput.value = printSpeed.toFixed(2)
  } else if (printSpeed < 0) {
    printSpeed = parseFloat('0.00')
    printSpeedInput.value = printSpeed.toFixed(2)
  }

  const filamentLength = parseFloat(
    (((vol / (filamentDiameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)

  let hours = Math.floor(filamentLength / printSpeed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filamentLength / printSpeed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  document.getElementById('hoursValue').innerHTML = hours
  document.getElementById('minutesValue').innerHTML = minutes
}

function init(fileExt, fileData) {
  if (fileExt === 'stl') {
    // SHOWING THE LOADING SPLASH
    document.getElementById('loading').style.display = 'block'
  } else if (fileExt === 'obj') {
    // SHOWING THE LOADING SPLASH
    document.getElementById('loading').style.display = 'block'
  } else {
    // HIDDING THE LOADING SPLASH
    document.getElementById('loading').style.display = 'none'
    alert(StringERROR)
  }

  const sceneConverter = new THREE.Scene()
  const exporter = new STLExporter()
  if (fileExt === 'obj') {
    const object = new OBJLoader().parse(fileData)
    sceneConverter.add(object)
    fileData = exporter.parse(sceneConverter)
  }

  const geometry = new STLLoader().parse(fileData)
  geometry.computeVertexNormals()
  geometry.center()

  const material = new THREE.MeshPhongMaterial({
    color: 0x00cc00,
    emissive: 0x000000,
    emissiveIntensity: 1,
  })
  mesh = new THREE.Mesh(geometry, material)

  mesh.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const positions = child.geometry.getAttribute('position').array
      for (let i = 0; i < positions.length; i += 9) {
        const t1 = {}
        t1.x = positions[i + 0]
        t1.y = positions[i + 1]
        t1.z = positions[i + 2]

        const t2 = {}
        t2.x = positions[i + 3]
        t2.y = positions[i + 4]
        t2.z = positions[i + 5]

        const t3 = {}
        t3.x = positions[i + 6]
        t3.y = positions[i + 7]
        t3.z = positions[i + 8]

        vol += signedVolumeOfTriangle(t1, t2, t3)
      }
    }
  })

  const box = new THREE.Box3().setFromObject(mesh)

  height = box.max.z - box.min.z
  width = box.max.x - box.min.x
  depth = box.max.y - box.min.y

  let heightFinal = height / 10
  heightFinal = heightFinal.toFixed(2)
  let widthFinal = width / 10
  widthFinal = widthFinal.toFixed(2)
  let depthFinal = depth / 10
  depthFinal = depthFinal.toFixed(2)
  let volumeFinal = vol / 1000
  volumeFinal = volumeFinal.toFixed(2)
  let weightFinal = volumeFinal * density
  weightFinal = weightFinal.toFixed(2)

  let filamentLength = parseFloat(
    (((vol / (filamentDiameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)
  filamentLength = parseFloat(filamentLength).toFixed(0)

  let hours = Math.floor(filamentLength / printSpeed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filamentLength / printSpeed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  if (minutes === 0) {
    minutes = 1
  }

  let finalCost = (weightFinal * filamentCost) / 1000
  finalCost = parseFloat(finalCost).toFixed(2)

  document.getElementById('weightValue').innerHTML = weightFinal
  document.getElementById('volumeValue').innerHTML = volumeFinal
  document.getElementById('widthValue').innerHTML = widthFinal
  document.getElementById('depthValue').innerHTML = depthFinal
  document.getElementById('heightValue').innerHTML = heightFinal
  document.getElementById('costValue').innerHTML = finalCost
  document.getElementById('lengthValue').innerHTML = filamentLength
  document.getElementById('hoursValue').innerHTML = hours
  document.getElementById('minutesValue').innerHTML = minutes

  let distance

  if (height > width && height > depth) {
    distance = height * 2
  } else if (width > height && width > depth) {
    distance = width * 2
  } else if (depth > height && depth > width) {
    distance = depth * 2
  } else {
    distance = depth * 4
  }

  camera.position.set(0, -distance, 0)

  // AN ALTERNATIVE FOR MOVING THE OBJECT USING THE MOUSE WITHIN THE RENDERER
  controls = new OrbitControls(camera, renderer.domElement)
  // controls = new OrbitControls(camera);

  const lightHolder = new THREE.Group()
  const ambientLight = new THREE.AmbientLight(0xd5d5d5)
  const light = new THREE.SpotLight(0xffffff)
  light.position.set(1, distance, 100)
  light.castShadow = true
  lightHolder.add(light)
  lightHolder.add(ambientLight)
  scene.add(lightHolder)

  const updateSpin = () => {
    mesh.rotation.x += getRandomValue(0.003, 0.004)
    mesh.rotation.y += getRandomValue(0.001, 0.002)
    mesh.rotation.z += getRandomValue(0.003, 0.004)
  }

  controls.addEventListener('end', () => {
    clearTimeout(pauseSpinTimeout)
    pauseSpinTimeout = setTimeout(() => {
      pauseSpin = 1
    }, 30000)
  })

  controls.addEventListener('start', () => {
    clearTimeout(pauseSpinTimeout)
    pauseSpin = 0
  })

  const animateSpin = () => {
    if (pauseSpin) {
      updateSpin()
    }
    controls.update()
    lightHolder.quaternion.copy(camera.quaternion)
    renderer.render(scene, camera)
    requestAnimationFrame(animateSpin)
  }
  controls.update()
  scene.add(mesh)
  animateSpin()
  // HIDDING THE LOADING SPLASH
  document.getElementById('loading').style.display = 'none'

  document.getElementById('modelContainer').appendChild(renderer.domElement)

  window.addEventListener('resize', onWindowResize, false)
}

function ModelViewer(props) {
  useEffect(() => {
    async function fetchData() {
      const print2aApiEndpoint = 'https://api.print2a.com'
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const filePath = urlParams.get('fileLocation')
      const fileName = filePath.split('/').pop()
      const fileExt = fileName.split('.').pop().toLowerCase()
      const data = await fetch(
        `${print2aApiEndpoint}/GetFile?fileLocation=print2a/${filePath}`,
      )
      let fileData = null
      if (fileExt === 'obj') {
        fileData = await data.text()
      } else {
        fileData = await data.arrayBuffer()
      }

      const densityInput = document.getElementById('densityValue')
      densityInput.addEventListener('input', () =>
        moreDensity(densityInput.value.toString()),
      )
      densityInput.value = density

      const costKilogramInput = document.getElementById('costKilogramValue')
      costKilogramInput.addEventListener('input', () =>
        moreCost(costKilogramInput.value.toString()),
      )
      costKilogramInput.value = filamentCost

      const filamentDiameterInput = document.getElementById('diameterValue')
      filamentDiameterInput.addEventListener('input', () =>
        moreDiameter(filamentDiameterInput.value.toString()),
      )
      filamentDiameterInput.value = filamentDiameter

      const printSpeedInput = document.getElementById('printSpeedValue')
      printSpeedInput.addEventListener('input', () =>
        moreSpeed(printSpeedInput.value.toString()),
      )
      printSpeedInput.value = printSpeed

      document.getElementById('calcContainer').style.display = 'block'
      init(fileExt, fileData)
    }
    fetchData()
  }, [])

  return (
    <div className="ModelViewer">
      <div id="loading" className="loading_splash">
        <div className="loading_splash_container">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="content">
        <div id="modelContainer"></div>
        <div id="calcContainer">
          <Frame
            animate
            level={0}
            corners={6}
            layer="primary"
            show={props.anim.entered}
          >
            <div id="calcContents">
              <div className="calcButtons">
                <Button
                  buttonProps={buttonStyle}
                  className="modelButtons"
                  onClick={() => {
                    const urlParams = new URLSearchParams(
                      window.location.search,
                    )
                    let objParams = urlParams.get('fileLocation').split('/')
                    objParams.pop()
                    objParams = objParams.join('/')
                    window.location.href = `/browse/${objParams}`
                  }}
                >
                  <i className="fa-solid fa-gun fa-flip-horizontal"></i>
                  &nbsp;Back to Folder
                </Button>
                &nbsp;&nbsp;
                <Button
                  buttonProps={buttonStyle}
                  className="modelButtons"
                  onClick={() => {
                    const urlParams = new URLSearchParams(
                      window.location.search,
                    )
                    const filePath = urlParams.get('fileLocation')

                    window.open(
                      `https://api.print2a.com/print2a/${filePath}`,
                      '_blank',
                    )
                  }}
                >
                  <i className="fa-solid fa-circle-arrow-down"></i>
                  &nbsp;Download
                </Button>
                &nbsp;&nbsp;
                <Button
                  buttonProps={{
                    style: { padding: '1vh' },
                    Id: 'calcButton',
                  }}
                  className="modelButtons"
                  id="calcButton"
                  onClick={() => {
                    const calcContentsToggle =
                      document.getElementById('calcContentsToggle')
                    const isToggled = calcContentsToggle.style.display
                    if (isToggled === 'none') {
                      calcContentsToggle.style.display = 'inherit'
                    } else {
                      calcContentsToggle.style.display = 'none'
                    }
                  }}
                >
                  <i className="fa-solid fa-calculator"></i>
                  &nbsp;Calc Menu
                </Button>
              </div>
              <div style={{ display: 'none' }} id="calcContentsToggle">
                <Line animate className="separator" />
                <label htmlFor="densityValue">
                  <Words animate show={props.anim.entered}>
                    Density:&nbsp;
                  </Words>
                </label>
                <input id="densityValue" />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;g/cc&nbsp;
                </Words>
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreDensity(null, 1)}
                >
                  <i className="fa-solid fa-circle-chevron-up"></i>
                </Button>
                &nbsp;
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreDensity(null, 0)}
                >
                  <i className="fa-solid fa-circle-chevron-down"></i>
                </Button>
                <br style={brStyle} />
                <Words animate show={props.anim.entered}>
                  Weight:&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="weightValue"
                />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;g
                </Words>
                <br style={brStyle} />
                <Words animate show={props.anim.entered}>
                  Volume:&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="volumeValue"
                />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;cm3
                </Words>
                <br style={brStyle} />
                <Words animate show={props.anim.entered}>
                  Dimensions:&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="widthValue"
                />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;x&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="heightValue"
                />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;x&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="depthValue"
                />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;cm
                </Words>
                <br style={brStyle} />
                <Line animate className="separator" />
                <label htmlFor="costKilogramValue">
                  <Words animate show={props.anim.entered}>
                    Filament Cost:&nbsp;
                  </Words>
                  <Words layer="alert" animate show={props.anim.entered}>
                    $
                  </Words>
                </label>
                <input id="costKilogramValue" />
                &nbsp;&nbsp;
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreCost(null, 1)}
                >
                  <i className="fa-solid fa-circle-chevron-up"></i>
                </Button>
                &nbsp;
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreCost(null, 0)}
                >
                  <i className="fa-solid fa-circle-chevron-down"></i>
                </Button>
                <br style={brStyle} />
                <Words animate show={props.anim.entered}>
                  Printing Cost:&nbsp;
                </Words>
                <Words layer="alert" animate show={props.anim.entered}>
                  $
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="costValue"
                />
                <br style={brStyle} />
                <Line animate className="separator" />
                <Words animate show={props.anim.entered}>
                  Filament Diameter:&nbsp;
                </Words>
                <input id="diameterValue" />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;mm&nbsp;
                </Words>
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreDiameter(null, 1)}
                >
                  <i className="fa-solid fa-circle-chevron-up"></i>
                </Button>
                &nbsp;
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreDiameter(null, 0)}
                >
                  <i className="fa-solid fa-circle-chevron-down"></i>
                </Button>
                <br style={brStyle} />
                <Words animate show={props.anim.entered}>
                  Print Speed:&nbsp;
                </Words>
                <input id="printSpeedValue"></input>
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;mm/s&nbsp;
                </Words>
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreSpeed(null, 1)}
                >
                  <i className="fa-solid fa-circle-chevron-up"></i>
                </Button>
                &nbsp;
                <Button
                  buttonProps={buttonStyle}
                  className="buttonChanger"
                  onClick={() => moreSpeed(null, 0)}
                >
                  <i className="fa-solid fa-circle-chevron-down"></i>
                </Button>
                <br style={brStyle} />
                <Words animate show={props.anim.entered}>
                  Filament Length:&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="lengthValue"
                />
                <Words layer="alert" animate show={props.anim.entered}>
                  &nbsp;mm
                </Words>
                <br style={brStyle} />
                <Words animate show={props.anim.entered}>
                  Print Time:&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="hoursValue"
                />
                &nbsp;
                <Words layer="alert" animate show={props.anim.entered}>
                  hrs&nbsp;
                </Words>
                <Words
                  layer="alert"
                  animate
                  show={props.anim.entered}
                  id="minutesValue"
                />
                &nbsp;
                <Words layer="alert" animate show={props.anim.entered}>
                  mins
                </Words>
                <br style={brStyle} />
              </div>
            </div>
          </Frame>
        </div>
      </div>
    </div>
  )
}

export default ModelViewer
