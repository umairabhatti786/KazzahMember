import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {ActivityIndicator} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Screen, theme} from 'ui';

const {height, width} = Dimensions.get('screen');

const TermsAndCondition = ({navigation}: any) => {
  const [loading, setLoading] = useState(true);
  return (
    <Screen
      backgroundColor={theme.colors.white}
      edges={['right', 'top', 'left']}
    >
      {/* <View style={styles.container}> */}
      {/* <TouchableOpacity
        style={{
          width: scale(60),
          height: scale(40),
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={40} color="#000000" />
      </TouchableOpacity> */}
      {loading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} style={styles.indicator} />
        </View>
      ) : null}
      <WebView
        // onLoadStart={() => {
        //   setLoading(true)
        // }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        style={{height: height, width: width}}
        source={{uri: 'https://www.kazzah.com/user-agreement'}}
      />
      {/* </View> */}
    </Screen>
  );
};

// Export
export default TermsAndCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {marginTop: 10, marginBottom: 20, marginStart: 21.5},
  heading: {
    fontSize: responsiveWidth(7.5),
  },
  scrollContainer: {marginBottom: 30, marginEnd: 65},
  content: {
    fontSize: responsiveWidth(3.5),
  },
  spacer: {height: 70},
  button: {
    width: width - 40,
    justifyContent: 'center',
    height: responsiveHeight(6.5),
    borderRadius: 40,
  },
  buttonText: {
    fontSize: responsiveWidth(3.5),
    alignSelf: 'center',
  },
  indicator: {alignSelf: 'center'},
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
