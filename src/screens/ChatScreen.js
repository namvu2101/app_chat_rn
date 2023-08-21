import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Modal, Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import UIModel from '../components/UIModel';

const ChatScreen = ({route, navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [receiverName, setReceiverName] = useState(route.params.NameChat)
  const receiverAvatar = route.params.Avatar;
  const senderId = auth().currentUser.uid; // ID của người gửi
  const receiverId = route.params.id;
  const [showTime, setShowTime] = useState({});

  const hideModal = () => {
    setVisible(!visible);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#2C6BED'},
      headerTitleStyle: {color: 'white'},
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Avatar.Image size={49} source={{uri: receiverAvatar}} />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              marginHorizontal: 10,
            }}>
            {receiverName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <>
          <TouchableOpacity onPress={() => alert('video call')}>
            <Avatar.Icon size={45} icon="video" style={styles.color_font} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('call')}>
            <Avatar.Icon size={40} icon="phone" style={styles.color_font} />
          </TouchableOpacity>
          <TouchableOpacity onPress={hideModal}>
            <Avatar.Icon
              size={40}
              icon="information"
              style={styles.color_font}
            />
          </TouchableOpacity>
        </>
      ),
    });
  }, [receiverName]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          const message = {
            id: documentSnapshot.id,
            text: documentSnapshot.data().text,
            timestamp: documentSnapshot.data().timestamp?.toDate(),
            senderId: documentSnapshot.data().senderId,
            senderAvatar: documentSnapshot.data().senderAvatar,
          };
          data.push(message);
        });

        setMessages(data);
      });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    setInputText('');
    if (inputText) {
      try {
        await firestore().collection('Messages').add({
          text: inputText,
          timestamp: firestore.FieldValue.serverTimestamp(),
          receiverId: receiverId,
          senderId: senderId,
          senderAvatar: auth().currentUser.photoURL,
          senderName: auth().currentUser.displayName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderItem = ({item: message, index}) => {
    const isSender = message.senderId === senderId;
    const previousMessage = index > 0 ? messages[index - 1] : null;
    const showTimestamp =
      isSender ||
      (previousMessage &&
        message.timestamp - previousMessage.timestamp > 30 * 60 * 1000);
    return (
      <View key={message.id}>
        {!showTimestamp ? (
          <Text style={{textAlign: 'center', color: 'black'}}>
            {message.timestamp
              ? message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </Text>
        ) : null}
        {!isSender && (
          <Avatar.Image size={30} source={{uri: message.senderAvatar}} />
        )}
        <View style={isSender ? styles.messageSender : styles.messageReciever}>
          <TouchableOpacity
            onPress={() => {
              setShowTime({...showTime, [message.id]: !showTime[message.id]});
            }}>
            <Text style={isSender ? styles.senderText : styles.reciverText}>
              {message.text}
            </Text>
          </TouchableOpacity>
          {showTime[message.id] && (
            <Text
              style={
                isSender
                  ? styles.timestampSenderText
                  : styles.timestampReciverText
              }>
              {message.timestamp
                ? message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Type a message..."
          placeholderTextColor={'#ccc'}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Avatar.Icon
            size={35}
            icon="image"
            style={styles.buttonContainer}
            color="#2C6BED"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage}>
          <Avatar.Icon
            size={35}
            icon="send"
            style={styles.buttonContainer}
            color="#2C6BED"
          />
        </TouchableOpacity>
      </View>
      <UIModel
        hideModal={hideModal}
        visible={visible}
        imageUri={receiverAvatar}
        Name={receiverName}
        upDateName={setReceiverName}
        receiverId={receiverId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  messageSender: {
    padding: 10,
    backgroundColor: '#2C6BED',
    alignSelf: 'flex-end',
    borderRadius: 25,
    maxWidth: '80%',
    position: 'relative',
    marginRight: 10,
    marginVertical: 3,
  },
  messageReciever: {
    padding: 10,
    backgroundColor: '#efefef',
    alignSelf: 'flex-start',
    borderRadius: 25,
    maxWidth: '80%',
    position: 'relative',
    marginLeft: 10,
  },
  reciverText: {
    fontSize: 20,
    marginRight: 8,
    color: 'black',
  },
  senderText: {
    fontSize: 20,
    marginRight: 8,
    color: 'white',
  },
  timestampSenderText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
  },
  timestampReciverText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'left',
  },
  color_font: {backgroundColor: '#2C6BED'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#2C6BED',
    marginRight: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
});

export default ChatScreen;
