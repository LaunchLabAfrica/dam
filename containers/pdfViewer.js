import React from 'react';
// import PDF from 'react-pdf-js';
import 'pdfjs-dist';
import PDF, { Page } from 'react-pdf-pages';

export default  class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
      pages: null
    }
  }
  
  onComplete(pages) {
    this.setState({ pages });
  }

  render() {
    return (
      <PDF url={this.props.url} 
      onComplete={this.onComplete}>
        { this.state.pages &&
          <div> 
            { this.state.pages.map((page) => 
              <Page key={page.key} page={page} />
            )}
          </div>
        }
      </PDF>
    );
  }
  
}


/*
export default class PDFViewer extends React.Component {
  // static async getInitialProps() {
  //   const pdfSrc = '/static/Andela_Standard_MSA.pdf';
  //   return {
  //     pdfSrc
  //   }
  // }
  //   
  constructor(props) {
    super(props);
    this.onDocumentComplete = this.onDocumentComplete.bind(this);
    this.onPageComplete = this.onPageComplete.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      pdf: null,
      scale: 1.2
    }
  }
  
  onDocumentComplete(pages) {
    this.setState({ page: 1, pages});
  }

  onPageComplete(page) {
    this.setState({ page });
  }

  handlePrevious() {
    this.setState({ page: this.state.page - 1 });
  }
  
  handleNext() {
    this.setState({ page: this.state.page + 1 });
  }
  
  componentDidMount() {
    PDFJS.getDocument('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf').then((pdf) => {
      console.log(pdf);
      this.setState({ pdf });
    });
  }
  
  render() {
    return (
      <div>
        <NoSSR>
        { typeof window !== 'undefined'
         ? <PDF file='https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf' onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page="1" />
          : '' 
        }
        </NoSSR>
      </div>
    );
  }
}
*/
