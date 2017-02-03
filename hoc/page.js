import React from 'react';

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
         <WrappedComponent {...this.props} />
      </div>
    );
  }
}
