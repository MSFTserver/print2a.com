import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import anime from 'animejs';

import { Link } from '../Link';

class Component extends React.Component {
  static displayName = 'Brand';

  static propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    energy: PropTypes.object.isRequired,
    audio: PropTypes.object.isRequired,
    sounds: PropTypes.object.isRequired,
    className: PropTypes.any,
    link: PropTypes.string,
    hover: PropTypes.bool,
    stableTime: PropTypes.bool,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    onLinkStart: PropTypes.func,
    onLinkEnd: PropTypes.func
  };

  static defaultProps = {
    link: '/'
  };

  constructor () {
    super(...arguments);

    const { energy, stableTime } = this.props;

    if (!stableTime) {
      energy.updateDuration({ enter: 820 });
    }
  }

  componentWillUnmount () {
    const paths = this.svgElement.querySelectorAll('path');
    anime.remove(paths);
  }

  enter () {
    const { energy, sounds, stableTime, onEnter } = this.props;
    const paths = this.svgElement.querySelectorAll('path');

    anime.set(this.svgElement, { opacity: 1 });

    sounds.logo.play();

    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      delay: (path, index) => stableTime ? 0 : index * energy.duration.stagger,
      duration: path => stableTime ? energy.duration.enter : path.getTotalLength(),
      complete: () => {
        onEnter && onEnter();
      }
    });
  }

  exit () {
    const { energy, sounds, onExit } = this.props;
    const paths = this.svgElement.querySelectorAll('path');

    sounds.fade.play();

    anime({
      targets: this.svgElement,
      easing: 'easeInCubic',
      duration: energy.duration.exit,
      opacity: 0
    });
    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      direction: 'reverse',
      duration: energy.duration.exit,
      complete: () => {
        anime.set(this.svgElement, { opacity: 0 });
        onExit && onExit();
      }
    });
  }

  render () {
    const {
      theme,
      classes,
      energy,
      audio,
      sounds,
      className,
      link,
      hover,
      stableTime,
      onEnter,
      onExit,
      onLinkStart,
      onLinkEnd,
      ...etc
    } = this.props;

    return (
      <h1 className={cx(classes.root, hover && classes.hover, className)} {...etc}>
        <Link
          className={classes.link}
          href={link}
          title='print2a logo'
          onLinkStart={onLinkStart}
          onLinkEnd={onLinkEnd}
        >
          <span className={classes.title}>print2a</span>
          <svg
            ref={ref => (this.svgElement = ref)}
            className={classes.svg}
            viewBox='0 0 1100 92'
            xmlns='http://www.w3.org/2000/svg'
            onMouseEnter={() => sounds.hover.play()}
          >
            <path className={classes.path} d='M 158 81 L 158 42.08 L 260.62 42.08 L 260.62 10 L 158 10' />
            <path className={classes.path} d='M 295 82 L 295 10 L 370 10 L 370 40.217 L 324.866 40.0632 L 370 81' />
            <path className={classes.path} d='M 390.651 10.265 L 516.651 10.265 M 432.651 18.265 L 432.065 78.22 M 474.065 86.22 L 378.065 86.22 L 357.549 69.836' />
            <path className={classes.path} d='M 512.552 94.106 L 512.651 6 M 512.651 6 L 572.678 94.59 M 572.678 6 L 572.678 94.548' />
            <path className={classes.path} d='M 565.678 10 L 680.101 10 M 624.187 16.723 L 624.423 86.22' />
            <path className={classes.path} d='M 702.757 2.183 L 763.084 2.511 M 779.597 10.32 L 779.82 35.758 M 763.531 45.13 L 703.204 46.023 M 691.234 54.502 L 691.457 79.94 M 701.944 90.651 L 762.415 89.982' />
            <path className={classes.path} d='M 803.145 90.023 L 803.145 1.493 L 871.145 1.493 L 871.145 90 M 811.145 37.493 L 863.145 37.493' />
          </svg>
        </Link>
      </h1>
    );
  }
}

export { Component };
