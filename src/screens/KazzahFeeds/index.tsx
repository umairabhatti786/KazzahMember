import React, {useEffect, useRef} from 'react';
import {View} from 'ui';
import MediaView from './MediaView';
import {useSelector} from 'react-redux';
import {getFeeds} from 'reducers/authReducer';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useDispatch} from 'react-redux';
import {fetchContactsList} from 'reducers/contactReducer';

const KazzahFeeds = (props: any) => {
  const feeds = useSelector(getFeeds);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsList({filter: 'all'}));
  }, []);

  const carouselRef = useRef<any>(null);

  const index = props?.route?.params?.index;

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Carousel
        defaultIndex={index}
        ref={carouselRef}
        vertical={true}
        loop
        width={screenWidth}
        height={screenHeight}
        data={feeds}
        scrollAnimationDuration={1000}
        renderItem={({item, index}) => {
          return <MediaView index={index} media={item} />;
        }}
      />
    </View>
  );
};

export default KazzahFeeds;
