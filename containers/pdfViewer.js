import React from 'react';
import styled from 'styled-components';
import 'pdfjs-dist';
import PDF, { Page } from 'react-pdf-pages';
PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker.js');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const Title = styled.div`
  font-size: 2em;
  color: #3359df;
  margin-bottom: 0;
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
    // const url = `https://cors-anywhere.herokuapp.com/https:${this.state.url}`;
    const url = this.state.url;
    const title = this.props.title;
    const description = this.props.description;
    return (
      <Container>
        <Title> {title} </Title>
        <p> {description } </p>
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
