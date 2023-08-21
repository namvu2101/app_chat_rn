import {launchImageLibrary} from 'react-native-image-picker';
import React ,{useState}from 'react';
import {Avatar, TextInput, Button} from 'react-native-paper';


function ImagePickerButton ({setImageUri,hideDialog}) {

  const handlePickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      quality: 0.5,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const res = response.assets[0].uri;
        setImageUri(res);
        hideDialog()
      }
    });
  };

  return (
      <Button mode='contained' onPress={handlePickImage}>Select From Galery</Button>
  );
};

export default ImagePickerButton;