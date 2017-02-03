import React from 'react';
import NoSSR from 'react-no-ssr';
import { Link } from '../routes';

import Page from '../hoc/page';
// import PDFViewer from '../containers/pdfViewer';

class Index extends React.Component {
  static async getInitialProps({query}) {
    const slug = await query.slug;
    return {
     slug 
    }
  }

  render() {
    return (
      <div>
        Howdy!
      {console.log(this.props.slug)}
      <Link route="file" params={{slug: 'msa'}}>
          <a> I'm a link </a>
      </Link>
      </div>
    );
  }
}

export default Page(Index);
