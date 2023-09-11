import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'ui';
import CountryPicker, {
  CountryModalProvider,
} from 'react-native-country-picker-modal';
import {Platform, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import ArrowDown from '../../assets/ArrowDown.svg';
import states from 'states-us';
import _ from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import { useController } from 'react-hook-form';
import textStyle from 'theme/typoGraphy';

type Props = {
  onSelect: React.Dispatch<any>;
  name:any;
  control:any;
};

const StateInput = ({onSelect,name,control}: Props) => {
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  const {field, fieldState} = useController({control, name});


  const [state, setState] = useState<any>();

  const {colors} = useTheme();

  const [stateList, setStateList] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const list = states.reverse().map(item => {
      return {
        label: item.name,
        value: item.abbreviation,
      };
    });

    setStateList(_.orderBy(list, item => item.label, ['asc']));
  }, []);

  const authState = useSelector(authSelector);

  return (
    <View 
    style={{
      minHeight: verticalScale(60),
        maxHeight: verticalScale(75),
        marginVertical: Platform.OS == 'ios' ? scale(10) : 0,
    }}
    
    >
      <Pressable
        style={{
          width: scale(150),
          height: verticalScale(50),
          position: 'absolute',
          zIndex: 1,
        }}
        onPress={() => setOpen(true)}
      />
      <DropDownPicker
        style={{position: 'absolute', zIndex: -10, opacity: 0, borderWidth: 0,display:'none'}}
        listMode="MODAL"
        searchable
        open={open}
        value={field.value as string}
        items={stateList}
        setOpen={setOpen}
        onSelectItem={item => {
          setState(item);
          onSelect(item?.value);
          field.onChange(item?.value)

        }}
      />
      <TextInput
        theme={{
          roundness: 7,
          fonts: {
            regular: {
              fontFamily: 'Calibre',
            },
          },
          colors: {
            text: colors.black,
          },
        }}
        defaultValue={
          authState?.currentUser?.state ? authState?.currentUser?.state : ''
        }
        label={
          <Text
            style={{
              color: colors.black,
              backgroundColor: colors.background,
              fontSize: 14,
              fontFamily: 'Calibre',
            }}>
            {'State'}
          </Text>
        }
        mode="outlined"
        autoCapitalize="none"
        outlineColor={colors.silverChalice}
        activeOutlineColor={colors.black + 'A1'}
        style={{
          backgroundColor: colors.background,
          width: scale(150),
          height: scale(50),
          borderRadius: 15,
          fontSize: moderateScale(15),
          fontFamily: 'Calibre',
          fontWeight: '500',
        }}
        value={field.value as string}
      />
      <View
        style={{
          position: 'absolute',
          end: '7%',
          top: '40%',
        }}>
        <ArrowDown style={{color: colors.black}} />
      </View>

      {fieldState.error && (
        <Text
          marginStart={'s'}
          marginBottom={'s'}
          marginTop={'s'}
          style={[textStyle.label, {color: colors.red}]}>
          {fieldState.error.message}
        </Text>
      )}
    </View>
  );
};

export default StateInput;
