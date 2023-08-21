import React, {useState, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {Appbar, Modal} from 'react-native-paper';
import {styles} from '../style';
import data from '../../data.json';

const PhoneNumber = () => {
  const [countrynm, setcountrynm] = useState('+1');
  const [expanded, setExpanded] = useState(false);

  const handlePress = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          handlePress();
          setcountrynm(item.dial_code);
        }}>
        <Text style={{color: 'black'}}>{item.dial_code}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Phone Number" />
      </Appbar.Header>
      <Text>Enter your phone number</Text>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          marginHorizontal: 20,
          height: 50,
          width: 80,
          backgroundColor: 'grey',
          justifyContent:'center'
        }}>
        <Text style={{textAlign:'center',color:'black'}}>{countrynm}</Text>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems:'center',
          width: 80,
          marginHorizontal: 20,
        }}>
        <Modal
          visible={expanded}
          onDismiss={handlePress}
          style={{alignItems:'center',backgroundColor:'#f123'}}
          >
          <ScrollView>
            {data.phoneNumber.map(i => (
              <TouchableOpacity
                onPress={() => {
                  handlePress();
                  setcountrynm(i.dial_code);
                }}
                key={i.code}>
                <Text style={{color:'black',paddingTop:5}}>{i.dial_code}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
};

export default PhoneNumber;
