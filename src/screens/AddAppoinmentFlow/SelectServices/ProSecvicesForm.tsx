import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React from 'react';
import ProServicesList from 'newComponents/ProServices';
import {useTheme} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {getProviderServices} from 'reducers/addAppointmentReducer';

const ProSecvicesForm = () => {
  const {colors} = useTheme();

  const providerServices = useSelector(getProviderServices);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingBottom: scale(100),
          backgroundColor: 'white',
          width: '100%',
        }}>
        <FlatList
          data={providerServices}
          nestedScrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={{marginTop: verticalScale(100)}}>
              <ActivityIndicator color={colors.black} />
            </View>
          )}
          renderItem={({item, index}) => {
            return <ProServicesList item={item} index={index} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProSecvicesForm;

const styles = StyleSheet.create({});
