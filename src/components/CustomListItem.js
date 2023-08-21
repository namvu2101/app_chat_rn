import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../style';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {List, Avatar} from 'react-native-paper';

const CustomListItem = ({id, NameChat, avatar}) => {
  const [chatMessages, setchatMessages] = useState([]);
  useEffect(() => {
    const unsubcribe = firestore()
      .collection('Messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setchatMessages(snapshot.docs.map(doc => doc.data())),
      );
    return unsubcribe;
  });
  return (
    <List.Item
      title={NameChat}
      titleStyle={{fontWeight: 'bold', color: 'black'}}
      descriptionStyle={{color: 'black'}}
      description={
        // `${chatMessages?.[0]?.displayName}: ${chatMessages?.[0]?.message}` ||
        chatMessages?.[0]?.text||
        `Hãy gửi lời chào tới ${NameChat}`
      }
      descriptionNumberOfLines={1}
      left={props => (
        <Avatar.Image size={50} {...props} source={{uri: avatar}} />
      )}
    />
  );
};

export default CustomListItem;
