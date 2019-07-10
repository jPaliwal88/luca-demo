import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from './shakingText';
 
class FingerprintPopup extends Component {
 
  constructor(props) {
    super(props);
    this.state = { 
        errorMessage: undefined,
        modalVisible: true
    };
  }
 
  componentDidMount() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
          this.setState({modalVisible: false})
        // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
      });
  }
 
  componentWillUnmount() {
    FingerprintScanner.release();
  }
 
  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
  };
 
  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;
 
    return (
        <Modal transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({modalVisible: false})}>
            <TouchableOpacity 
                activeOpacity={1} 
                onPress={() => this.setState({modalVisible: false})} 
                style={styles.modal}
            >
                <TouchableOpacity 
                    activeOpacity={1} 
                    onPress={() => {}} 
                    style={styles.children}
                >
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/finger_print.png')}
                    />
                    <Text style={styles.heading}>
                        Fingerprint Authentication
                    </Text>
                    <ShakingText
                        ref={(instance) => { this.description = instance; }}
                        style={styles.description(!!errorMessage)}>
                        {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
                    </ShakingText>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>

    );
  }
}
 
 
export default FingerprintPopup;

const styles = StyleSheet.create({
    children : {
        height: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 164, 222, 0.9)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
 
      logo: {
        marginVertical: 45,
        height: 80,
        width: 80
      },

      heading: {
        textAlign: 'center',
        color: '#00a4de',
        fontSize: 18,
      },

      description: (error) => ({
        textAlign: 'center',
        color: error ? '#ea3d13' : '#a5a5a5',
        height: 65,
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20,
      }),
      buttonContainer: {
        padding: 20,
      },
    
})