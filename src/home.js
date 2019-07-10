/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

const primaryColor = '#02B745';
const secondryColor = '#fff';

import React, { Fragment } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	StatusBar,
	Image,
	Dimensions,
	PermissionsAndroid,
	Platform
} from 'react-native';
import FingerprintPopup from './scanner/index';
import ContactPicker from './contactPicker';
import ContactsWrapper from 'react-native-contacts-wrapper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



class Home extends React.Component {
	state = {
		amount: 0,
		contact: {},
	}

	setAmount = (amount) => {
		console.log('setamount', Number(amount), amount);
		let newAmount = "";
		const oldAmount = this.state.amount;
		if(amount != '<'){
			if(oldAmount == 0){
				if(amount == '.'){
					newAmount = `0.`;
				}else if(oldAmount && (oldAmount.indexOf('.') !== -1)){
					newAmount = `${oldAmount}${amount}`;
				}
				else{
					newAmount = `${amount}`;
				}
			}else{
				newAmount =  `${oldAmount}${amount}`;
			}
				
		}else{
			newAmount =  Number(oldAmount) ? oldAmount.slice(0, -1) : 0;
			if(!newAmount){
				newAmount = 0
			}
		}
		this.setState({amount: newAmount})
	}

	openContactPicker = () => {
        ContactsWrapper.getContact()
        .then((contact) => {
			this.setState({contact})
            console.log(contact);
        })
        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });
	}
	
	onPay = () => {
		const { amount, contact = {} } = this.state;
		alert(`You sent $${amount} to ${contact.name}`)
	}


	requestContactPermission = async () => {
		if(Platform.OS == 'ios'){
			this.openContactPicker();
			return;
		}
		try {
		  const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
		  );
		  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			this.openContactPicker();
			console.log('You can use the contact');
		  } else {
			  alert("Contact Permission denied")
			console.log('Camera permission denied');
		  }
		} catch (err) {
		  console.warn(err);
		}
	  }

	  

	render(){
		const { contact, amount } = this.state;
		let integer = amount, decimal;
		if(amount){
			const amountArr = amount.split('.');
			integer = amountArr[0];
			decimal = amountArr[1];

			if((amount.indexOf('.') != -1) && !decimal){
				integer = integer+'.'
			}
			
			console.log('contactamount', amount, amount.split('.'))
		}
		return (
			<Fragment>
				<StatusBar backgroundColor={primaryColor} barStyle="light-content" />
				<View style={styles.container}>
					<FingerprintPopup/>
					<SafeAreaView style={styles.safeArea}>
						<View style={styles.inputCont}>
							<View style={styles.amountCont}>
								<Text style={styles.dollarSign}>$</Text>
								<Text style={styles.largeAmount}>{integer}</Text>
								<Text style={[styles.dollarSign]}>{decimal}</Text>
							</View>
							<View style={styles.contactSelect}>
								<TouchableOpacity onPress={this.requestContactPermission}>
									<Image source={require('../assets/images/plus.png')} style={{height: 30, width: 30, marginRight: 10}}/>
								</TouchableOpacity>
								 <Text style={styles.contactTxt}>{contact.name ? contact.name : 'No Contact Selected'}</Text>
							</View>
						</View>
						<View style={styles.keyboardCont}>
							<View style={styles.numberCont}>
								{numbers.map(item => (
									<TouchableOpacity onPress={() => this.setAmount(item)} key={item} style={styles.numberCell}>
										<Text style={styles.numberTxt}>{item}</Text>
									</TouchableOpacity>
								))}
							</View>
							<TouchableOpacity disabled={!amount || !contact.name} onPress={this.onPay} activeOpacity={0.8} style={styles.payBtn}>
								<Text style={styles.payTxt}>Pay</Text>
							</TouchableOpacity>
						</View>
					</SafeAreaView>
				</View>
			</Fragment>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: primaryColor,
		flex: 1,
	},

	safeArea: {

	},

	inputCont: {
		height: '45%',
		justifyContent: 'flex-end',
		padding: 30
	},

	amountCont: {
		justifyContent: 'center',
		flexDirection: 'row'
	},

	dollarSign: {
		fontSize: 50,
		color: secondryColor,
		marginTop: 5
	},

	contactSelect: {
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center'
	},

	contactTxt: {
		color: secondryColor,
		fontSize: 18
	},
	
	largeAmount: {
		fontSize: 90,
		color: secondryColor
	},

	smallAmount: {

	},

	keyboardCont: {
		height: '55%',
		justifyContent: 'space-between',
	},

	numberCont: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: '80%',
		paddingTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},

	numberCell: {
		width: width/3,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		height: '22%',
	},

	numberTxt: {
		color: secondryColor,
		fontSize: 22,
		backgroundColor: 'red',
	},

	payBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: secondryColor,
		marginHorizontal: 10,
		paddingVertical: 15,
		borderRadius: 10,
		marginBottom: 20
	},

	payTxt: {
		fontSize: 20,
		fontWeight: 'bold'
	}

	
});

export default Home;


const numbers = [1,2,3,4,5,6,7,8,9,".",0,"<"]