import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';

const CrossIcon = require('../../../assets/ProviderProfile/crossIcon.png');

type Props = {
  setModalVisible: any;
  modalVisible: any;
};

export const ConfirmORCancelModal: React.FC<Props> = ({
  setModalVisible,
  modalVisible,
}) => {
  return (
    <Modal
      visible={modalVisible}
      onBackdropPress={() => setModalVisible(!modalVisible)}>
      <View
        alignSelf={'center'}
        paddingVertical={'3xl'}
        paddingHorizontal={'xxl'}
        backgroundColor="grey3"
        borderRadius={scale(15)}
        flexDirection={'column'}
        borderColor={'black'}
        borderWidth={scale(2)}
        alignItems={'center'}>
        <Text color={'black'} fontSize={scale(20)}>
          Confirm Cancel
        </Text>
        <View height={scale(20)} />
        <View flexDirection={'row'} justifyContent={'space-between'}>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            justifyContent={'center'}
            alignItems={'center'}
            paddingVertical={'xs'}
            borderRadius={scale(5)}
            borderColor={'black'}
            borderWidth={scale(2)}
            paddingHorizontal={'xl'}
            backgroundColor={'background'}>
            <Text color={'black'} fontSize={scale(22)}>
              Cancel
            </Text>
          </Pressable>
          <View width={scale(50)} />
          <Pressable
            justifyContent={'center'}
            alignItems={'center'}
            paddingVertical={'xs'}
            borderRadius={scale(5)}
            borderColor={'black'}
            borderWidth={scale(2)}
            paddingHorizontal={'xl'}
            backgroundColor={'green'}>
            <Text color={'black'} fontSize={scale(22)}>
              Rebook
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
