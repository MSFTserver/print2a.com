import React, { useEffect, useState } from 'react'
import { Frame, Header, Heading, Link, Words, Row, Col } from 'arwes'

const print2aApiHost = 'https://print2a.com'
const print2aApiPort = '5757'
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`

const GetLatest = (props) => {
  const [latest, setLatest] = useState([
    { title: 'LOADING...', tags: 'LOADING...', link: '#' },
  ])
  async function getLatest() {
    const req = await fetch(`${print2aApiEndpoint}/LatestProjects`)
    const res = await req.json()
    setLatest(res)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getLatest()
    }
  }, [])
  const apiResponse = [...latest]
  const repoStats = [apiResponse.shift()]
  const stats = repoStats.map((stat, i) => {
    const details = stat.tags.split('\n').map((file, index) => {
      const key = file.split(':')[0]
      const value = file.split(':')[1]
      return (
        <Col s={10} m={10} l={10} xl={6} offset={['s1', 'm1', 'l1', 'xl3']}>
          <Frame
            animate
            level={3}
            corners={1}
            layer="primary"
            show={props.anim.entered}
          >
            <Words>{key}:&nbsp;</Words>
            <Words
              layer="alert"
              style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
            >
              {value}
            </Words>
          </Frame>
          <br />
        </Col>
      )
    })
    return (
      <Row col s={12} m={12} l={10} xl={10} offset={['s0', 'm0', 'l1', 'xl1']}>
        <Frame
          animate
          level={3}
          corners={3}
          layer="primary"
          show={props.anim.entered}
        >
          <Heading style={{ paddingTop: 20 }} node="h2">
            <div className="h2">{stat.title}</div>
          </Heading>
          {details}
        </Frame>
      </Row>
    )
  })
  let latestProjects = [
    { desc: <i className="fa-solid fa-gun  fa-shake"></i> },
    { desc: 'Nothing New' },
    { desc: 'Check Back Later' },
    {
      desc: (
        <i data-fa-transform="flip-h" className="fa-solid fa-gun fa-shake"></i>
      ),
    },
  ].map((file) => (
    <Col s={3} m={3} l={3} xl={3} style={props.style}>
      <Frame>{file.desc}</Frame>
    </Col>
  ))
  if (apiResponse.length) {
    latestProjects = apiResponse.map((project) => (
      <Link href={project.link}>
        <Col s={12} m={12} l={6} xl={4} style={props.style}>
          <Frame
            animate
            level={3}
            corners={3}
            layer="primary"
            show={props.anim.entered}
          >
            <Header>
              <Heading style={{ margin: 0 }} node="h3">
                <Words className="project-title">
                  <div className="h3">{project.title}</div>
                </Words>
              </Heading>
              <Words layer="primary">{project.created}</Words>
            </Header>
            <Row style={{ marginBottom: 0 }}>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">STL: {project.stl}</Words>
              </Col>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">STP: {project.stp}</Words>
              </Col>
            </Row>
            <Row style={{ marginBottom: 0 }}>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">Docs: {project.docs}</Words>
              </Col>
              <Col s={6} m={6} l={6} xl={6}>
                <Words layer="primary">Pics: {project.pics}</Words>
              </Col>
            </Row>
            <Col s={12} m={12} l={12} xl={12}>
              <Words layer="primary">Project Size: {project.size}</Words>
            </Col>
            <Col s={12} m={12} l={12} xl={12}>
              <Words layer="primary">Tags: {project.tags}</Words>
            </Col>
          </Frame>
        </Col>
      </Link>
    ))
  }

  return [...stats, ...latestProjects]
}
export default GetLatest
