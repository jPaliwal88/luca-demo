import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AlertIOS } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
 
class FingerprintPopup extends Component {
  state = {
    biometryType: "",
  }
 
  // componentDidMount() {
  //   FingerprintScanner
  //     .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
  //     .then(() => {
  //       // this.props.handlePopupDismissed();
  //       alert('Authenticated successfully');
  //     })
  //     .catch((error) => {
  //       // this.props.handlePopupDismissed();
  //       alert(error.message);
  //     });
  // }

  // componentDidMount() {
  //   FingerprintScanner
  //     .isSensorAvailable()
  //     .then(biometryType => this.setState({ biometryType }))
  //     .catch(error => this.setState({ errorMessage: error.message }));
  // }

  componentDidMount() {
    FingerprintScanner
      .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        
      })
      .catch((error) => {
        AlertIOS.alert(error.message);
      });
  }
 
  render() {
    console.log('biometryType', this.state.biometryType)
    return false;
  }
}
 
export default FingerprintPopup;

