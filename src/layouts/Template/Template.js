import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from '../../components/Layout';
import { Background } from '../../components/Background';
import { App } from '../../components/App';

let paths = ['/latest', '/links', '/browse', '/about'];

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

    const isURLContent = paths.find(path => {
      return location.pathname.indexOf(path) === 0;
    });
    const isBrowserPath = paths.includes("/"+location.pathname.replace("/","").split("/")[0])
    if (isURLContent || isBrowserPath){
      return (
        <Layout {...layout}>
          <Background
            {...background}
            animation={{ show, ...background.animation }}
          >
            {<App>{children}</App>}
          </Background>
        </Layout>
      );
    } else {
      return (
        <Layout {...layout}>
          <Background
            {...background}
            animation={{ show, ...background.animation }}
          >
            {children}
          </Background>
        </Layout>
      );
    }
  }
}

export { Component };
