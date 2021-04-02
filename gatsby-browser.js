/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

module.exports.onRouteUpdate = ({ location, prevLocation }) => {
  const sf = new RegExp('(\/browse\/)+[a-zA-Z0-9]+');
  if (location.pathname.match(sf)){
    let local = location.pathname.split("/")[1];
    window.location.replace("https://print2a.com/"+local)
  } else {
    const event = new CustomEvent(
      'route-change',
      { detail: { location, prevLocation } }
    );
    window.dispatchEvent(event);
  }
};
