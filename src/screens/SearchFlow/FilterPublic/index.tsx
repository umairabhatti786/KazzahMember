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
import textStyle from 'theme/typoGraphy';
import SearchProsItem from '../FilterPros/SearchProsItem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {getAllProviders} from 'reducers/searchReducer';

const FilterPublic = () => {
  const allPublic = useSelector(getAllProviders);

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
          {` Results (${allPublic?.length})`}
        </Text>
        <KeyboardAwareScrollView
          contentContainerStyle={{paddingBottom: verticalScale(80)}}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={allPublic}
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
              return <SearchProsItem item={item} index={index} />;
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default FilterPublic;

const styles = StyleSheet.create({});
