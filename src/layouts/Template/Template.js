import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from '../../components/Layout';
import { Background } from '../../components/Background';
import { App } from '../../components/App';
import projects from '../../../static/projects.json';

class Component extends React.Component {
  static displayName = 'Template';

  static propTypes = {
    location: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    layout: PropTypes.object,
    background: PropTypes.object,
    children: PropTypes.any
  };

  static defaultProps = {
    layout: {},
    background: {}
  };

  constructor () {
    super(...arguments);

    this.state = {
      show: true,
      enterShow: true
    };
  }

  componentDidMount () {
    const { theme } = this.props;

    setTimeout(
      () => this.setState({ enterShow: true }),
      theme.animation.time
    );
  }

  onEnter = () => {
    const { theme } = this.props;

    setTimeout(
      () => this.setState({ show: true }),
      theme.animation.time + theme.animation.stagger
    );
  }

  render () {
    const { show, enterShow } = this.state;
    const { location, classes, layout, background, children } = this.props;

    const isURLContent = ['/filesLatest', '/download', '/folderBrowser', '/about'].find(path => {
      return location.pathname.indexOf(path) === 0;
    });
      return (
        <Layout {...layout}>
          <Background
            {...background}
            animation={{ show, ...background.animation }}
          >
            {isURLContent ? <App>{children}</App> : children}
          </Background>
        </Layout>
      );
  }
}

export { Component };
