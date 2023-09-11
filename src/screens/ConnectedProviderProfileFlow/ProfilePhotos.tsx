import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {getProviderProfile, setSelectedImage} from 'reducers/providerReducer';
import MediaView from 'screens/KazzahFeeds/MediaView';
import {Pressable, Text, View} from 'ui';
const ProfileImage = require('../../assets/ProfileImage.png');

const ProfilePhotos = () => {
  const medias = useSelector(getProviderProfile)?.medias
    ? useSelector(getProviderProfile)?.medias
    : useSelector(getProviderProfile)?.media;
  const dispatch = useDispatch();

  const PhotoData = [
    {
      uri: ProfileImage,
    },
    {
      uri: ProfileImage,
    },
    {
      uri: ProfileImage,
    },
    {
      uri: ProfileImage,
    },
  ];

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <>
      <View flex={1}>
        <View height={scale(30)} />

        <FlatList
          contentContainerStyle={{paddingHorizontal: scale(10)}}
          showsHorizontalScrollIndicator={false}
          data={medias}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <React.Fragment>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    dispatch(
                      setSelectedImage({
                        item: item,
                        isActive: true,
                      }),
                    );
                  }}
                  style={styles.container}
                  key={index}>
                  <FastImage
                    source={{uri: item?.thumbnail}}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    // resizeMode="cover"
                  />
                </TouchableOpacity>
              </React.Fragment>
            );
          }}
        />
      </View>
    </>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      margin: scale(5),
      height: verticalScale(135),
      width: '50%',
      overflow: 'hidden',
      borderRadius: scale(14),
    },
  });

export default ProfilePhotos;
