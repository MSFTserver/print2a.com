const styles = theme => ({
  root: {
    position: 'relative',
    marginTop: 10
  },
  svg: {
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0
  },
  path: {
    opacity: ({ energy }) => energy.animate ? 0 : 1
  },
  content: {
    position: 'relative',
    zIndex: 10,
    padding: [20, 10, 10]
  },
  legal: {
    margin: [0, 'auto'],
    padding: 0,
    maxWidth: 400,
    fontSize: 12
  },

  '@media screen and (min-width: 768px)': {
    root: {
      marginTop: 20
    },
    content: {
      padding: [30, 20, 20]
    },
    legal: {
      fontSize: 14
    }
  }
});

export { styles };
