import React from 'react';
import styled from 'styled-components';
import PDF, { Page } from 'react-pdf-pages';
import 'pdfjs-dist';
PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker.min.js');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  color: 3359df;
`;

const PageContainer = styled.div`
  width: 640px;
  margin 0 auto 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Error = styled.div`
  background-color: #bb0000;
  border: 1px solid #aa0000;
  border-radius: 3px;
  padding: 10px;
  display: inline-block;
  color: #fff;
`;

export default  class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      url: this.props.url,
      pages: null,
      loaded: 0,
      total: 0, 
      error: null
    }
  }

  onProgress({loaded, total}) {
    this.setState({ loaded, total });
  }
  
  onComplete(pages) {
    this.setState({ pages });
  }

  onError(error) {
    this.setState({error});
  }

  render() {
    const url = this.state.url;
    return (
      <Container>
        <PDF url={url} 
          onProgress={this.onProgress}
          onComplete={this.onComplete}
          onError={this.onError} >
          { this.state.error
            ? <Error> 
                {this.state.error.message} 
              </Error>
            : this.state.pages
              ? <div> 
                  { this.state.pages.map((page) => 
                    <PageContainer key={page.key}>
                      <Page key={page.key} page={page} />
                    </PageContainer>
                  )}
                </div>
              : <Loading> Loading { this.state.loaded } / {this.state.total}</Loading>
          }
        </PDF>
      </Container>
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
