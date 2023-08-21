import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {styles} from '../style';
import CustomListItem from '../components/CustomListItem';
import {Avatar} from 'react-native-paper';
import { color_base } from '../style';


const HomeScreen = ({navigation}) => {
  const [data, setdata] = useState([]);
  const user = auth().currentUser
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
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{marginLeft: 10}}
          onPress={() => navigation.navigate('Profile')}>
          {user ? (
            <Avatar.Image size={35} source={{uri: user?.photoURL}} />
          ) : null}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('AddGroup')}>
            <Avatar.Icon
              size={40}
              icon="account-multiple-plus"
              style={{backgroundColor: 'white'}}
              color={color_base}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handelLogout}>
            <Avatar.Icon
              size={40}
              icon="logout"
              style={{backgroundColor: 'white'}}
              color={color_base}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [user.photoURL]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Chats')
      .onSnapshot(onSnapshot => {
        setdata(
          onSnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map(({id, data: {NameChat, Avatar}}) => (
          <TouchableOpacity
            key={id}
            onPress={() => {
              setTimeout(() => {
                navigation.navigate('Chat', {NameChat, Avatar, id});
              }, 200);
            }}>
            <CustomListItem NameChat={NameChat} avatar={Avatar} id={id} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
