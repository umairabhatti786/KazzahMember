import {FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {Text, View} from 'ui';
import _ from 'lodash';
import SettingListHeader from './SettingList';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import LogOutModal from './LogoutModal';
import DeviceInfo from 'react-native-device-info';
import {baseURL} from 'api/client';

type Props = {
  ProfileSetting: any;
};

const SettingDetail = ({ProfileSetting}: Props) => {
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const {colors} = useTheme();

  function convertToPascalCase(inputString: string) {
    const subdomains = inputString.match(/\/\/(.*?)\./);
    if (subdomains && subdomains.length > 1) {
      const [_, firstSubdomain] = subdomains;

      const firstPart = firstSubdomain;
      return firstPart
        .split(/[-.]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[textStyle.h3, {color: colors.black}]}>Settings</Text>
      <View height={scale(10)} />
      <View style={styles.listContainer}>
        <FlatList
          data={ProfileSetting}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return <SettingListHeader item={item} index={index} />;
          }}
        />
        <View height={scale(30)} />
        <Button
          label={'Log out'}
          width={'90%'}
          onPress={() => setShowLogOutModal(!showLogOutModal)}
        />
        <View height={scale(20)} />
        <Text style={[textStyle.b5, {color: colors.silverChalice}]}>
          {`Version ${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()}) ${convertToPascalCase(
            baseURL,
          )}`}
        </Text>
      </View>
      <LogOutModal visible={showLogOutModal} setVisible={setShowLogOutModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
    marginTop: scale(20),
  },
  listContainer: {
    paddingBottom: scale(200),
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
});

export default SettingDetail;
