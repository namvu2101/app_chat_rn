import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {Avatar, Button, TextInput, Dialog, Portal} from 'react-native-paper';
import {auth} from '../firebase/firebaseConfig';
import UIDialog from '../components/UIDialog';
import {firestore, userCurrent} from '../firebase/firebaseConfig';
import { color_base } from '../style';
const ProfileScreen = ({navigation,route}) => {
  const user = auth().currentUser;
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [imageUri, setimageUri] = useState(auth().currentUser.photoURL);
  const [isSeclected, setIsSeclected] = useState('');
  const [gender, setGender] = useState('');
  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const [displayName, setdisplayName] = useState(
    auth().currentUser.displayName,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Proflie',
      headerRight: () => (
        <>
          <TouchableOpacity onPress={handelLogout}>
            <Avatar.Icon
              size={40}
              icon="logout"
              style={{backgroundColor: 'white'}}
              color={color_base}
            />
          </TouchableOpacity>
        </>
      ),
    });
  }, []);

  const handelLogout = () => {
    Alert.alert(
      'Thông báo!',
      'Bạn có muốn đăng xuất không ?',
      [
        {
          text: 'OK',
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                navigation.navigate('Login', {email: user.email});
              });
          },
        },
        {text: 'Hủy'},
      ],
      {cancelable: true},
    );
  };

  const SaveInformation = () => {
    UpdateInformation();
    auth()
      .currentUser.updateProfile({
        displayName: displayName,
        photoURL: imageUri,
      })
      .then(() =>
        Alert.alert('', 'Successful update', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]),
      )
      .catch(e => console.log(e));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('Users')
          .where('Email', '==', userCurrent.email)
          .get();

        const userData = querySnapshot.docs.map(doc => doc.data());
        userData.map(i => {
          setGender(i.Sex);
          setDateOfBirth(i.Date);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const UpdateInformation = () => {
    firestore()
      .collection('Users')
      .doc(userCurrent.uid)
      .update({
        Sex: gender,
        Date: dateOfBirth,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setIsSeclected('Avatar');
          setVisibleDialog(!visibleDialog);
        }}>
        <Avatar.Image size={80} source={{uri: imageUri}} />
      </TouchableOpacity>

      <View style={styles.body}>
        <TouchableOpacity
          style={styles._Item}
          onPress={() => {
            setIsSeclected('Item 0');
            setVisibleDialog(!visibleDialog);
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text_color}>DisplayName</Text>
            <Text style={styles.text_color}>{displayName}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles._Item}
          onPress={() => {
            setIsSeclected('Item 1');
            setVisibleDialog(!visibleDialog);
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text_color}>Date of birth</Text>
            <Text style={styles.text_color}>{dateOfBirth}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles._Item}
          onPress={() => {
            setIsSeclected('Item 2');
            setVisibleDialog(!visibleDialog);
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text_color}>Gender</Text>
            <Text style={styles.text_color}>{gender}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles._Item}
          onPress={() => {
            setIsSeclected('Item 3');
            setVisibleDialog(!visibleDialog);
          }}>
          <Text style={styles.text_color}>Chage Password</Text>
        </TouchableOpacity>
      </View>

      <Button textColor="white" mode="contained" onPress={SaveInformation}>
        Save
      </Button>
      <UIDialog
        setImageUri={setimageUri}
        displayName={displayName}
        setdisplayName={setdisplayName}
        setDateOfBirth={setDateOfBirth}
        isSelected={isSeclected}
        setGender={setGender}
        hideDialog={() => setVisibleDialog(!visibleDialog)}
        visible={visibleDialog}
        
        ></UIDialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical:80
  },
  text_color: {color: 'black', textAlign: 'center'},
  body: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  _Item: {
    height: 40,
    width: 300,
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  _input: {
    backgroundColor: 'white',
    width: 300,
    height: 60,
  },
  color_font: {backgroundColor: '#2C6BED'},
});

export default ProfileScreen;
