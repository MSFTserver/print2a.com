import { SCHEME_EXPAND } from './Menu.constants';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: [0, 'auto'],
    userSelect: 'none'
  },
  item: {
    display: 'block',
    padding: [10, 0, 10],
    width: '100%',
    lineHeight: 1,
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadow: `0 0 5px ${theme.color.link.main}`,
    fontFamily: theme.typography.primary,
    color: theme.color.link.main,
    whiteSpace: 'nowrap'
  },
  divisor: {
    display: 'none',
    width: 0,
    color: theme.color.tertiary.main,
    textShadow: `0 0 5px ${theme.color.tertiary.main}`,
    fontWeight: 'normal',
    transform: 'scale(1, 0)',
    transformOrigin: 'center center'
  },
  link: {
    overflow: 'hidden',
    opacity: ({ scheme }) => scheme === SCHEME_EXPAND ? 0 : 1,

    '&.link-active': {
      color: theme.color.tertiary.main,
      textShadow: `0 0 5px ${theme.color.tertiary.main}`
    },
    '&:hover, &:focus': {
      color: theme.color.secondary.light,
      textShadow: `0 0 5px ${theme.color.secondary.light}`
    }
  },

  '@media (min-width: 768px)': {
    root:{
      flexDirection: 'row',
    },
    item: {
      display: 'block'
    },
    divisor: {
      display: 'block'
    }
  }
});

export { styles };
