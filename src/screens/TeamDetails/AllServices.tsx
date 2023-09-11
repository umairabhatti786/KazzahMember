import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import {Pressable, Screen, Text, View} from 'ui';
import AppBackHeader from 'newComponents/AppBackHeader';
import AlphabetSort from '../../assets/AlphabetSort.svg';
import {FlatList} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {SvgUri} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {getProCategories} from 'reducers/categoryReducer';
import {useDispatch} from 'react-redux';
import {setSelectedServiceId, setServiceId} from 'reducers/addProReducer';
import {setProviderId} from 'reducers/providerReducer';

const AllServices = (props: any) => {
  const {colors} = useTheme();

  const proCategories = useSelector(getProCategories);

  const dispatch = useDispatch();
  const onAddPros = () => {
    props.navigation.navigate('AddProType');
  };

  const onPressProItem = (item: any) => {
    if (!item?.id) {
      dispatch(setServiceId(item?.categoryId));
      dispatch(setSelectedServiceId(item?.categoryId));

      onAddPros();
    } else {
      dispatch(setProviderId(item?.id));

      console.log('NonKAzaPro', item);

      if (item.userType == 'non_kazzah') {
        props.navigation.navigate('NonKazzahProfile', {
          data: item,
        });
      } else {
        props.navigation.navigate('ConnectedProviderProStack', {
          data: item,
        });
      }
    }
  };

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        <AppBackHeader navigation={props.navigation} label="Your teams" />
        <View height={verticalScale(10)} />
        <View style={{paddingHorizontal: '6%'}}>
          <React.Fragment>
            <Pressable onPress={() => {}}>
              <AlphabetSort height={scale(35)} width={scale(35)} />
            </Pressable>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
              }}
            >
              <FlatList
                style={{height: '90%'}}
                showsVerticalScrollIndicator={false}
                data={proCategories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <View style={{flex: 1}}>
                      <Pressable
                        onPress={() => onPressProItem(item)}
                        style={{
                          borderBottomColor: colors.gallery,
                          borderBottomWidth: 1,
                          borderTopColor: colors.gallery,
                          borderTopWidth: 1,
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          height: verticalScale(50),
                        }}
                      >
                        <View flexDirection={'row'} alignItems={'center'}>
                          <View
                            style={{
                              height: scale(40),
                              width: scale(40),
                              backgroundColor: '#ffffff',
                              borderRadius: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: scale(5),
                            }}
                          >
                            <SvgUri
                              width={scale(30)}
                              height={scale(30)}
                              uri={item?.image}
                            />
                            <View width={90} />
                          </View>
                          <View width={scale(20)} />
                          <View flexDirection={'column'}>
                            <Text
                              style={[
                                textStyle.b3,
                                {color: colors.black, marginTop: scale(5)},
                              ]}
                            >
                              {item?.categoryName}
                            </Text>
                            <Text
                              style={[
                                textStyle.b5,
                                {color: colors.doveGray, marginTop: scale(5)},
                              ]}
                            >
                              <Text
                                variant={'info'}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={[
                                  textStyle.b5,
                                  {
                                    color: colors.silverChalice,
                                    marginTop: scale(3),
                                  },
                                ]}
                              >
                                {item?.firstName
                                  ? item?.firstName?.charAt(0).toUpperCase() +
                                    item?.firstName?.slice(1)
                                  : '+ Add professional'}{' '}
                                {item?.lastName
                                  ? item?.lastName?.charAt(0).toUpperCase() +
                                    item?.lastName?.slice(1)
                                  : ''}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  );
                }}
              />
            </View>
          </React.Fragment>
        </View>
      </View>
    </Screen>
  );
};

export default AllServices;
