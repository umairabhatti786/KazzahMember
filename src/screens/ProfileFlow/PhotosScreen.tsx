import React, {useEffect, useState} from 'react';
import {Screen, Text, View} from 'ui';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import AddPhotoIcon from '../../assets/AddPhotoIcon.svg';
import MasonryList from '@react-native-seoul/masonry-list';
import PhotoListCard from './PhotoListCard';
import AddPhotoBottomSheet from './AddPhotoBottomSheet';
import PhotoMenuBottomSheet from './PhotoMenuBottomSheet';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import {useDispatch} from 'react-redux';
import {
  getProfileMedia,
  getProfileMediaLoading,
  getProfileMediaResponse,
} from 'reducers/updateProfileReducer';
import {useToast} from 'react-native-toast-notifications';
import NoMedia from './NoMedia';
import MediaView from 'screens/KazzahFeeds/MediaView';
export const PhotoScreen = () => {
  const {colors} = useTheme();
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showPhotoMenuModal, setShowPhotoMenuModal] = useState(false);
  const mediaList = useSelector(getProfileMediaResponse);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [selectMediaView, setSelectMediaView] = useState('');

  const [mediaResponse, setMediaResponse] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfileMedia())
        .unwrap()
        .then(originalPromiseResult => {
          setLoading(false);
          // console.log('selectedPhoto', mediaList);

          setMediaResponse(originalPromiseResult);
        })
        .catch(rejectedValueOrSerializedError => {
          setLoading(false);

          // handle error here
        });
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   setLoading(true);

  //   dispatch(getProfileMedia())
  //     .unwrap()
  //     .then(originalPromiseResult => {
  //       setLoading(false);

  //       setMediaResponse(originalPromiseResult);
  //     })
  //     .catch(rejectedValueOrSerializedError => {
  //       setLoading(false);

  //       // handle error here
  //     });
  // }, []);

  return (
    <>
      <Screen
        backgroundColor={colors.background}
        edges={['right', 'top', 'left']}>
        <BackButtonHeader showEye={true} showPages={false} />
        <View
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <Title title="Photos" />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              marginTop: '7%',
              marginRight: '8%',
              paddingLeft: scale(10),
              paddingVertical: verticalScale(10),
            }}
            onPress={() => setShowAddPhotoModal(!showAddPhotoModal)}>
            <AddPhotoIcon />
          </TouchableOpacity>
        </View>
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}>
          {loading ? (
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.black} />
            </View>
          ) : mediaResponse.length > 0 ? (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: scale(20),
                paddingBottom: scale(50),
              }}>
              <MasonryList
                numColumns={2}
                containerStyle={{zIndex: -10}}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <View
                    height={200}
                    justifyContent="center"
                    alignItems={'center'}>
                    <Text style={{color: 'white'}}> No media found </Text>
                  </View>
                }
                data={mediaResponse}
                renderItem={({item, index}) => {
                  console.log('itemCard', item?.id);
                  return (
                    <PhotoListCard
                      visible={showPhotoMenuModal}
                      setSelectedPhoto={setSelectedPhoto}
                      setSelectMediaView={setSelectMediaView}
                      selectedPhoto={selectedPhoto}
                      setVisible={setShowPhotoMenuModal}
                      item={item}
                      index={index}
                    />
                  );
                }}
              />
            </ScrollView>
          ) : (
            <NoMedia setShowAddPhotoModal={setShowAddPhotoModal} />
          )}
        </Wrapper>
        <AddPhotoBottomSheet
          visible={showAddPhotoModal}
          setVisible={setShowAddPhotoModal}
        />
        <PhotoMenuBottomSheet
          selectedPhoto={selectedPhoto}
          visible={showPhotoMenuModal}
          setVisible={setShowPhotoMenuModal}
        />
      </Screen>

      {selectMediaView ? (
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
          <MediaView
            profileMedia={true}
            setMedia={setSelectMediaView}
            index={1}
            media={selectMediaView}
          />
        </View>
      ) : null}
    </>
  );
};
