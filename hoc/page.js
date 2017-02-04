import React from 'react';
import Head from '../components/head';
export default WrappedComponent => class extends React.Component {
  static async getInitialProps(ctx) {
    const props = await WrappedComponent.getInitialProps(ctx);
    return {
      ...props
    }
  }
  render () {
    return (
      <div>
         <Head />
         <WrappedComponent {...this.props} />
      </div>
    );
  }
}
