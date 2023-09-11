import {StyleSheet, ScrollView} from 'react-native';
import {Pressable, View, Text} from 'ui';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import textStyle from 'theme/typoGraphy';
import {scale, verticalScale} from 'react-native-size-matters';
import MasonryList from '@react-native-seoul/masonry-list';
import PhotoListCard from 'screens/ProfileFlow/PhotoListCard';
import PhotoMenuBottomSheet from 'screens/ProfileFlow/PhotoMenuBottomSheet';
import ExplorePhotoCard from 'newComponents/ExplorePhotoCard';
import {useSelector} from 'react-redux';
import {getProviderMedia, getPublicProviderMedia} from 'reducers/searchReducer';
import PhotoMenuBottom from '../PhotoMenuBottom';
const TempPhoto = require('../../../../src/assets/temporaryLIstImage.png');

const ExploreProImage = () => {
  const {colors} = useTheme();
  const PhotoListCardData = useSelector(getProviderMedia);
  const [selectedPhoto, setSelectedPhoto] = useState({});

  const [showPhotoMenuModal, setShowPhotoMenuModal] = useState(false);

  return (
    <>
      <View>
        <Text
          numberOfLines={1}
          style={[
            textStyle.h3,
            {color: colors.black, marginVertical: verticalScale(10)},
          ]}>
          Results ({PhotoListCardData.length})
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: scale(50),
          }}>
          <MasonryList
            numColumns={2}
            containerStyle={{zIndex: -10}}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View height={200} justifyContent="center" alignItems={'center'}>
                <Text style={{color: 'white'}}> No media found </Text>
              </View>
            }
            data={PhotoListCardData}
            renderItem={({item, index}) => {
              return (
                <ExplorePhotoCard
                  visible={showPhotoMenuModal}
                  setSelectedPhoto={setSelectedPhoto}
                  setVisible={setShowPhotoMenuModal}
                  item={item}
                  index={index}
                />
              );
            }}
          />
        </ScrollView>
      </View>
      <PhotoMenuBottom
        selectedPhoto={selectedPhoto}
        visible={showPhotoMenuModal}
        setVisible={setShowPhotoMenuModal}
      />
    </>
  );
};

export default ExploreProImage;

const styles = StyleSheet.create({});
