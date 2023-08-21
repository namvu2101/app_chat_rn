import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  Avatar,
  TouchableRipple,
} from 'react-native-paper';
import {
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {color_base} from '../style';
import UIDialog from './UIDialog';

const UIModel = ({visible, hideModal, imageUri, upDateName,Name,receiverId}) => {
  const [isSeclected, setIsSeclected] = React.useState('');
  const [visibleDialog, setVisibleDialog] = React.useState(false);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            width: '90%',
            marginHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}>
          <TouchableNativeFeedback onPress={hideModal}>
            <Avatar.Icon
              icon="keyboard-backspace"
              size={50}
              color={color_base}
              style={{backgroundColor: 'white'}}
            />
          </TouchableNativeFeedback>

          <Avatar.Icon
            icon="dots-vertical"
            size={50}
            color={color_base}
            style={{backgroundColor: 'white'}}
          />
        </View>
        <UIDialog
          isSelected={isSeclected}
          hideDialog={() => setVisibleDialog(!visibleDialog)}
          visible={visibleDialog}
          Name={Name}
          upDateName={upDateName}
          receiverId={receiverId}
        />
        <ScrollView style={{flex: 1, width: '100%'}}>
          <View style={{alignItems: 'center', flex: 1}}>
            <Avatar.Image size={80} source={{uri: imageUri}} />
            <Text>{Name}</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                justifyContent: 'space-around',
              }}>
              <TouchableNativeFeedback onPress={hideModal}>
                <Avatar.Icon
                  icon="phone"
                  size={40}
                  color={color_base}
                  style={{backgroundColor: '#ECECEC'}}
                />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={hideModal}>
                <Avatar.Icon
                  icon="video"
                  size={40}
                  color={color_base}
                  style={{backgroundColor: '#ECECEC'}}
                />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={hideModal}>
                <Avatar.Icon
                  icon="account-plus"
                  size={40}
                  color={color_base}
                  style={{backgroundColor: '#ECECEC'}}
                />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={hideModal}>
                <Avatar.Icon
                  icon="bell"
                  size={40}
                  color={color_base}
                  style={{backgroundColor: '#ECECEC'}}
                />
              </TouchableNativeFeedback>
            </View>
            <View style={{height: 500, width: '100%'}}>
              <Text style={{textAlign: 'left', color: 'grey'}}>Hành động</Text>
              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={() => {
                  setIsSeclected('Change_Name');
                  setVisibleDialog(!visibleDialog);
                }}>
                <Text style={{textAlign: 'center', color: 'black'}}>
                  Đổi Tên
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginVertical: 10}} onPress={() => {}}>
                <Text style={{textAlign: 'center', color: 'black'}}>
                  Đổi Avatar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default UIModel;
