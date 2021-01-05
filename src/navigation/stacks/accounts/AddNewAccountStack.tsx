import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import NewAccountSelectionContainerScreen from '../../../pages/Accounts/AddNew/NewAccountSelectionContainerScreen'
import AddNewHexaAccountDetailsScreen from '../../../pages/Accounts/AddNew/HexaAccount/AddNewHexaAccountDetailsScreen'
import SmallNavHeaderBackButton from '../../../components/navigation/SmallNavHeaderBackButton'
import AddNewDonationAccountDetailsScreen from '../../../pages/Accounts/AddNew/DonationAccount/AddNewDonationAccountDetailsScreen'
import defaultStackScreenNavigationOptions from '../../options/DefaultStackScreenNavigationOptions'
import { View, Text } from 'react-native'
import NavStyles from '../../../common/Styles/NavStyles'


const AddNewAccountStack = createStackNavigator(
  {
    AccountSelectionList: {
      screen: NewAccountSelectionContainerScreen,
      navigationOptions: ( ) => {
        return {
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerTitle: () => {
            return <View style={{
              width: 1000, // Sort of a hack to get the subtitle all on one line (See: https://github.com/bithyve/hexa/issues/2391)
            }}>
              <Text style={NavStyles.modalHeaderTitleText}>Add New Account</Text>
              <Text style={NavStyles.modalHeaderSubtitleText}>Add an account, add a service, or import a wallet</Text>
            </View>
          },
          headerRight: null,
          headerRightContainerStyle: {
            backgroundColor: 'red',
          }
        }
      },
    },
    AddNewHexaAccountDetails: {
      screen: AddNewHexaAccountDetailsScreen,
      navigationOptions: {
        title: 'Account Details'
      }
    },
    AddNewDonationAccountDetails: {
      screen: AddNewDonationAccountDetailsScreen,
      navigationOptions: {
        title: 'Account Details'
      }
    },
  },
  {
    initialRouteName: 'AccountSelectionList',
    defaultNavigationOptions: ( { navigation } ) => {
      return {
        ...defaultStackScreenNavigationOptions,
        headerLeft: () => {
          return <SmallNavHeaderBackButton onPress={() => { navigation.pop() }} />
        },
      }
    },
  },
)

export default AddNewAccountStack
