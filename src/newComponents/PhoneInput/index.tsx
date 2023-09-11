import React, {useState} from 'react';
import {Text, View} from 'ui';
import CountryPicker, {
  CountryModalProvider,
} from 'react-native-country-picker-modal';
import {Platform, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import ArrowDown from '../../assets/ArrowDown.svg';

const initialCountryState = {
  cca2: 'US',
  callingCode: '1',
  name: 'United States',
};

type Props = {
  onSelect: React.Dispatch<any>;
};

const PhoneInput = ({onSelect}: Props) => {
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  const [country, setCountry] = useState<any>(initialCountryState);

  const {colors} = useTheme();

  return (
<View
      style={{
        minHeight: verticalScale(60),
        maxHeight: verticalScale(75),
      }}>
              <CountryModalProvider>
        <CountryPicker
          {...{
            allowFontScaling: true,
            countryCode: 'US',
            withFilter: true,
            excludeCountries: ['AQ'],
            withFlag: true,
            withCurrencyButton: false,
            withCallingCodeButton: false,
            withCountryNameButton: false,
            withAlphaFilter: true,
            withCallingCode: true,
            withCurrency: false,
            withEmoji: false,
            withModal: true,
            withFlagButton: false,
            onSelect: country => {
              let callingCode = `+`;
              if (country.callingCode && country.callingCode.length) {
                callingCode += country.callingCode[0];
              }
              setCountry(country);
              onSelect(country);
            },
            disableNativeModal: false,
            preferredCountries: ['US', 'GB'],
            modalProps: {
              visible: pickerVisible,
            },
            onClose: () => setPickerVisible(false),
            onOpen: () => setPickerVisible(true),
          }}
        />
      </CountryModalProvider>
      <TouchableOpacity
        style={{
          width: scale(310),
          height: verticalScale(50),
          position: 'absolute',
          zIndex: 1,
        }}
        onPress={() => setPickerVisible(true)}
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
        defaultValue={`${country.name} ( +${country.callingCode} )`}
        label={
          <Text
            style={{
              color: colors.black,
              backgroundColor: colors.background,
              fontSize: 14,
              fontFamily: 'Calibre',
            }}>
            {'Country / Region'}
          </Text>
        }
        mode="outlined"
        autoCapitalize="none"
        outlineColor={colors.silverChalice}
        activeOutlineColor={colors.black + 'A1'}
        style={{
          backgroundColor: colors.background,
          width: scale(310),
          height: '20%',
          borderRadius: 15,
          fontSize: moderateScale(15),
          fontFamily: 'Calibre',
          fontWeight: '500',
        }}
        value={`${country.name} ( +${country.callingCode} )`}
      />
      <View
        style={{
          position: 'absolute',
          end: '5%',
          top: '50%',
        }}>
        <ArrowDown style={{color: colors.black}} />
      </View>
    </View>
  );
};

export default PhoneInput;
