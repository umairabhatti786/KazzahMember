import React from 'react';
import {Pressable, Text, View} from 'ui';
import BackArrow from '../../assets/BackArrow.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import QRCode from '../../assets/QRCode.svg';
import EyeIcon from '../../assets/EyeIcon.svg';
import AddPhotoIcon from '../../assets/AddPhotoIcon.svg';
import {TouchableOpacity} from 'react-native';

type Props = {
  total?: string;
  current?: string;
  showPages?: boolean;
  showCancel?: boolean;
  showQRCode?: boolean;
  showSave?: boolean;
  showEye?: boolean;
  showSearch?: boolean;
  onSearch?: any;
  handleBack?: any;
  onPressSave?: any;
  showDelete?: any;
  onDelete?: any;
  saveColor?: any;
  onCancelPress?: any;
  backColor?: any;
};

const BackButtonHeader = ({
  total = '3',
  current = '1',
  onSearch,
  backColor,
  saveColor,
  showPages = true,
  showCancel = false,
  showQRCode = false,
  showSave = false,
  showEye = false,
  showSearch = false,
  showDelete = false,
  handleBack = null,
  onDelete,
  onCancelPress,
  onPressSave,
}: Props) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  return (
    <View
      flexDirection={'row'}
      justifyContent={'space-between'}
      paddingHorizontal={'s'}
      paddingRight={'xxl'}
      marginTop={'3xl'}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: scale(5),
          paddingBottom: verticalScale(5),
        }}
        onPress={handleBack ? handleBack : () => navigation.goBack()}
      >
        <BackArrow
          style={{
            alignSelf: 'flex-start',
            marginLeft: scale(10),
            color: backColor || colors.black,
          }}
          width={scale(20)}
          height={scale(15)}
        />
      </TouchableOpacity>
      {showPages && (
        <View>
          <Text style={[textStyle.b3, {color: colors.silverChalice}]}>
            {`${current} of ${total}`}
          </Text>
        </View>
      )}

      {showCancel && (
        <Pressable onPress={onCancelPress}>
          <Text
            style={[textStyle.b3, {color: colors.black, fontWeight: '500'}]}
          >
            Cancel
          </Text>
        </Pressable>
      )}
      {showQRCode && (
        <Pressable onPress={() => navigation.navigate('QRCodeStack')}>
          <QRCode style={{marginRight: scale(10)}} />
        </Pressable>
      )}
      {showSave && (
        <Pressable onPress={onPressSave}>
          <Text
            style={[
              textStyle.b3,
              {color: saveColor || colors.black, fontWeight: '500'},
            ]}
          >
            Save
          </Text>
        </Pressable>
      )}
      {showEye && (
        <Pressable onPress={() => {}}>
          <EyeIcon color={colors.black} style={{marginRight: scale(10)}} />
        </Pressable>
      )}

      {showSearch && (
        <Pressable onPress={onSearch}>
          <SearchIcon
            style={{
              color: colors.black,
            }}
            width={scale(20)}
            height={scale(20)}
          />
        </Pressable>
      )}

      {showDelete && (
        <Pressable onPress={onDelete}>
          <DeleteIcon
            style={{
              color: colors.black,
              marginRight: scale(10),
            }}
            width={scale(20)}
            height={scale(20)}
          />
        </Pressable>
      )}
    </View>
  );
};

export default BackButtonHeader;
