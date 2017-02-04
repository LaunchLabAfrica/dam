import React from 'react';
import Head from 'next/head';
import NoSSR from 'react-no-ssr';
import PDFViewer from '../containers/pdfViewer';

const env = process.env.NODE__ENV || 'development';
const config = require('../config')[env];

export default class extends React.Component {
  static async getInitialProps({ query: { fileName } }) {
    const isServer = typeof window === 'undefined';
    const contentful = isServer ? require('../lib/contentful') : null;
    const client = contentful.init(config.contentful, isServer);

    let asset = {};
    const res = await client.getAssets()
      .then((assets) => {
        assets.items.forEach((item) => {
          const file = item.fields;
          if(file.file.fileName.includes(fileName)) {
            asset = {
              title: file.title,
              description: file.description,
              fileName: file.file.fileName,
              url: file.file.url
            }
          }
        })
      })

    return {
      asset
    }
  }


  render() {
    const asset = this.props.asset;
    return (
      <div>
        <Head>
          <title> { asset.title } </title>
          <script dangerouslySetInnerHTML={{__html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
            analytics.load("SvsvzRLzAwfPZSRqPKLYtVtTwgIsak0M");
              analytics.page();
                }}();`}} />
        </Head>
        <NoSSR>
          <PDFViewer url={asset.url} title={asset.title} description={asset.description} />
        </NoSSR>
      </div>
    );
  }
}
