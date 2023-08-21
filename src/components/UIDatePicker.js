import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';

const UIDatePicker = ({hideDialog, setDateOfBirth}) => {
  const [date, setDate] = useState(new Date());

  const updateDateofBirth=()=>{
    setDateOfBirth(
      date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear(),
    );
    hideDialog()
  }
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <DatePicker
        textColor="black"
        mode="date"
        locale="vn"
        date={date}
        onDateChange={setDate}
        androidVariant="nativeAndroid"
        onConfirm={date => {
          setDate(date);
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <Button textColor="#2C6BED" onPress={hideDialog}>
          Cancel
        </Button>
        <Button
          textColor="#2C6BED"
          onPress={updateDateofBirth}>
          Ok
        </Button>
      </View>
    </View>
  );
};

export default UIDatePicker;

const styles = StyleSheet.create({});
