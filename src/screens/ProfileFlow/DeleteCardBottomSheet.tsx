import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {verticalScale, scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {Pressable, Text, View} from 'ui';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import CrossIcon from '../../assets/CrossIcon.svg';
import DeleteCardConfirmModal from './DeleteCardConfirmModal';

type Props = {
  visible: any;
  setVisible: any;
  onPressConfirmDelete: any;
};

const DeleteCardBottomSheet = ({
  visible,
  setVisible,
  onPressConfirmDelete,
}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const onClose = () => {
    setVisible();
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View
        flexDirection={'column'}
        alignSelf="center"
        style={{backgroundColor: colors.background, padding: '6%'}}
        height={'28%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Pressable style={styles.crossIcon} onPress={onClose}>
          <CrossIcon
            style={{
              color: colors.black,
              width: scale(40),
              height: scale(40),
            }}
          />
        </Pressable>
        <View height={scale(15)} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setShowConfirmDeleteModal(!showConfirmDeleteModal);
          }}
          style={styles.container}>
          <DeleteIcon
            style={{
              color: colors.black,
              marginRight: scale(10),
            }}
            width={scale(16)}
            height={scale(17)}
          />

          <View width={scale(20)} />
          <Text style={[textStyle.b3, {color: colors.black}]}>Delete</Text>
        </TouchableOpacity>
      </View>

      <DeleteCardConfirmModal
        visible={showConfirmDeleteModal}
        setVisible={setShowConfirmDeleteModal}
        onPress={onPressConfirmDelete}
        onPressClose={onClose}
      />
    </BottomSheet>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderBottomColor: colors.gallery,
      borderBottomWidth: 1,
      backgroundColor: colors.background,
      borderTopColor: colors.gallery,
      borderTopWidth: 1,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      height: verticalScale(55),
    },
    crossIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: scale(40),
      width: scale(40),
      marginTop: scale(-10),
      marginLeft: scale(-10),
    },
  });

export default DeleteCardBottomSheet;
