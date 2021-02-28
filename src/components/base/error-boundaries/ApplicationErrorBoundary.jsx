import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {logErrorRemotely} from '@utils/helpers';

export class ApplicationErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {

    // not sure if there's a way to do this with React functional component?
    // https://stackoverflow.com/questions/48482619/how-can-i-make-use-of-error-boundaries-in-functional-react-components

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    logErrorRemotely(error, errorInfo);
  }

  render() {
    return this.state.errorInfo
      ? (
        <div className="error-boundary">
          An error occured...
        </div>
        )
      : this.props.children;
  }
}

ApplicationErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ApplicationErrorBoundary;
