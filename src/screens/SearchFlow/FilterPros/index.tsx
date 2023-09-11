import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Screen, View, Text, theme, Pressable} from 'ui';

import React, {useState} from 'react';
import ProsList from 'newComponents/ProsList';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import SearchProsItem from './SearchProsItem';
import textStyle from 'theme/typoGraphy';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {getAllProviders, getMyProviders} from 'reducers/searchReducer';

const FilterPros = ({navigation}) => {
  const myProviders = useSelector(getMyProviders);

  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();

  return (
    <View>
      <View
        style={{
          paddingBottom: scale(300),
          backgroundColor: 'white',
          width: '100%',
        }}>
        <Text
          numberOfLines={1}
          style={[
            textStyle.h3,
            {color: colors.black, marginVertical: verticalScale(10)},
          ]}>
          {` Results (${myProviders?.length})`}
        </Text>
        <KeyboardAwareScrollView
          contentContainerStyle={{paddingBottom: verticalScale(80)}}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={myProviders}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <>
                {loading ? (
                  <View style={{marginTop: verticalScale(100)}}>
                    <ActivityIndicator color={colors.black} />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
            renderItem={({item, index}) => {
              return (
                <SearchProsItem
                  item={item}
                  // onPress={() => {
                  //   navigation.navigate('ProviderProfileScreen');
                  // }}
                  // prosIndex={prosIndex}
                  // setProsIndex={setProsIndex}
                  // selectPros={selectPros}
                  index={index}
                  // setSelectPros={setSelectPros}
                />
              );
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default FilterPros;

const styles = StyleSheet.create({});
