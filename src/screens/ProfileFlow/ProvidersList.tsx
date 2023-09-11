import {FlatList, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {View} from 'ui';
import _ from 'lodash';
import {useNavigation, useTheme} from '@react-navigation/native';
import ProviderListHeader from './ProvidersListHeader';
import Button from 'newComponents/Button';
import {Wrapper} from 'newComponents/wrappers';
import {useDispatch} from 'react-redux';
import {setSelectedConnectionId, setUserType} from 'reducers/chatReducer';

type Props = {
  ProviderListData: any;
  onClose: any;
  mediaUrl: any;
};

const ProvidersList = ({ProviderListData, onClose, mediaUrl}: Props) => {
  const {colors} = useTheme();
  const [isSelected, setSelection] = useState();
  const [isPro, setisPro] = useState();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  return (
    <React.Fragment>
      <Wrapper
        style={{
          flex: 1,
        }}
        duration={400}
        animation="slideInRight">
        <View style={styles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingBottom: scale(60),
                backgroundColor: 'white',
                width: '100%',
              }}>
              <FlatList
                data={ProviderListData}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <ProviderListHeader
                      item={item}
                      index={index}
                      isSelected={isSelected}
                      setSelection={setSelection}
                      setisPro={setisPro}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </Wrapper>
      <View style={styles.proBtn}>
        <Button
          disabled={isSelected ? false : true}
          label="Send"
          width={'90%'}
          onPress={() => {
            onClose();
            console.log('issssspro', isPro, isSelected);

            dispatch(setSelectedConnectionId(isSelected));
            dispatch(setUserType(isPro));
            navigation.navigate('ChatDetailScreen', {
              userId: isSelected,
              userType: isPro,
              mediaUrl: mediaUrl,
              chatShare: true,
            });
          }}
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'white',
    width: '100%',
  },
  proBtn: {
    position: 'absolute',
    bottom: verticalScale(30),
    alignItems: 'center',
    width: '100%',

    left: '7%',
  },
});

export default ProvidersList;
