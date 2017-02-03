const contentful = require('contentful');

let contentfulClient;

export const init = (config, isServer) => {
  if(!contentfulClient && isServer) {
    contentfulClient = contentful.createClient({
      accessToken: config.accessToken,
      space: config.space
    });
  }
  return contentfulClient;
}

export const client = () => {
  return contentfulClient;
}
