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
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <NoSSR>
          <PDFViewer url={asset.url} />
        </NoSSR>
      </div>
    );
  }
}
