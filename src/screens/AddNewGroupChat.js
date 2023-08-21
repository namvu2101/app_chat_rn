import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../style';
import {Avatar, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const AddNewGroupChat = ({navigation,route}) => {
  const [text, settext] = useState('');

  const handelAddchat = async name => {
    await firestore()
      .collection('Chats')
      .add({
        NameChat: name,
        Avatar:
          'https://th.bing.com/th/id/OIP.OnvcA-1dBpBRlJo6_p-nxAHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7'
      })
      .then(() => navigation.goBack())
      .catch(e => console.log('Error=>', e));
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={settext}
        autoFocus
        style={{backgroundColor: 'white'}}
        textColor="black"
        placeholder="Enter a chatGroup name"
        right={
          <TextInput.Icon
            icon="plus-circle"
            size={30}
            iconColor="black"
            disabled={text.length==0? true : false}
            onPress={() => handelAddchat(text)}
          />
        }
      />
    </View>
  );
};

export default AddNewGroupChat;
