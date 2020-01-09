import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fonts from '../../common/Fonts';
import BackupStyles from './Styles';
import Colors from '../../common/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import ContactList from '../../components/ContactList';
import { uploadEncMShare } from '../../store/actions/sss';
import { useDispatch, useSelector } from 'react-redux';
import CommunicationModeModalContents from '../../components/CommunicationModeModalContents';
import DeviceInfo from 'react-native-device-info';
import { getIconByStatus } from './utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TrustedContacts = props => {
  const getTrustContact = props.navigation.state.params.getTrustContact
    ? props.navigation.state.params.getTrustContact
    : null;
  const [selectedStatus, setSelectedStatus] = useState('error'); // for preserving health of this entity
  const [contacts, setContacts] = useState([]);
  const [communicationModeBottomSheet, setCommunicationMode] = useState(
    React.createRef(),
  );

  const index = props.navigation.getParam('index');
  const selectedContacts = props.navigation.getParam('contacts');

  function selectedContactsList(list) {
    if (list.length > 0) setContacts([...list]);
  }

  const dispatch = useDispatch();
  const { DECENTRALIZED_BACKUP } = useSelector(state => state.storage.database);
  const { SHARES_TRANSFER_DETAILS } = DECENTRALIZED_BACKUP;

  const continueNProceed = async () => {
    // if (!SHARES_TRANSFER_DETAILS[index]) dispatch(uploadEncMShare(index));
    // else {
    //   Alert.alert('OTP', SHARES_TRANSFER_DETAILS[index].OTP);
    //   console.log(SHARES_TRANSFER_DETAILS[index]);
    // }
    if (getTrustContact) {
      getTrustContact(contacts, index);
    }
    props.navigation.goBack();
    let contactListArray = [];
    let contactList = JSON.parse(
      await AsyncStorage.getItem('SelectedContacts'),
    );
    if (contactList) {
      contactListArray = contactList;
      for (let i = 0; i < contacts.length; i++) {
        contactListArray.push(contacts[i]);
      }
    } else {
      for (let i = 0; i < contacts.length; i++) {
        contactListArray.push(contacts[i]);
      }
    }
    await AsyncStorage.setItem(
      'SelectedContacts',
      JSON.stringify(contactListArray),
    );
    // props.navigation.navigate('CommunicationMode', {
    //   contact: contacts[0],
    //   index,
    // });
  };

  // function requestHeader() {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={10}
  //       onPress={() => closeModal()}
  //       style={{ ...styles.modalHeaderContainer }}
  //     >
  //       <View style={styles.modalHeaderHandle} />
  //     </TouchableOpacity>
  //   );
  // }

  // function closeModal() {
  //   communicationModeBottomSheet.current.snapTo(0);
  //   return;
  // }

  // function renderCommunicationModeContent() {
  //   return (
  //     <CommunicationModeModalContents
  //       onPressProceed={communicate}
  //       contact={contacts[0]}
  //     />
  //   );
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={BackupStyles.headerContainer}>
        <TouchableOpacity
          style={BackupStyles.headerLeftIconContainer}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <View style={BackupStyles.headerLeftIconInnerContainer}>
            <FontAwesome name="long-arrow-left" color={Colors.blue} size={17} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={BackupStyles.modalHeaderTitleView}>
        <View style={{ marginTop: hp('1%') }}>
          <Text style={BackupStyles.modalHeaderTitleText}>Trusted Contact</Text>
          <Text style={BackupStyles.modalHeaderInfoText}>Never backed up</Text>
        </View>
        <Image
          style={BackupStyles.cardIconImage}
          source={getIconByStatus(selectedStatus)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginLeft: 30,
            color: Colors.textColorGrey,
            fontFamily: Fonts.FiraSansRegular,
            fontSize: RFValue(12, 812),
            marginTop: 5,
          }}
        >
          Select contact to{' '}
          <Text
            style={{
              fontFamily: Fonts.FiraSansMediumItalic,
              fontWeight: 'bold',
            }}
          >
            send recovery secret
          </Text>
        </Text>
        <ContactList
          style={{}}
          //selectedContact = {}
          onPressContinue={continueNProceed}
          onSelectContact={selectedContactsList}
        />
      </View>
      {/* <BottomSheet
        enabledInnerScrolling={true}
        ref={communicationModeBottomSheet}
        snapPoints={[
          Platform.OS == "ios" && DeviceInfo.hasNotch() ? 0 : 0,
          Platform.OS == "ios" && DeviceInfo.hasNotch() ? hp("65%") : hp("75%")
        ]}
        renderContent={renderCommunicationModeContent}
        renderHeader={requestHeader}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalHeaderContainer: {
    paddingTop: 20,
  },
  modalHeaderHandle: {
    width: 30,
    height: 5,
    backgroundColor: Colors.borderColor,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 7,
  },
});

export default TrustedContacts;
