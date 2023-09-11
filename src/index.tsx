import React from 'react';
import 'react-native-gesture-handler';
import {Text, theme, ThemeProvider, View} from 'ui';
import {ToastProvider} from 'react-native-toast-notifications';
import {RootNavigator} from 'navigation';
import {setI18nConfig} from 'core';
import APIProvider from 'api/APIProvider';
import {Provider} from 'react-redux';
import store from './store';
import customToasts from 'newComponents/CustomToast';
import {
  TourGuideProvider, // Main provider
} from 'rn-tourguide';
import {TouchableOpacity, Image} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import FlashMessage from 'react-native-flash-message';

const ArrowDownIcon = require('./assets/downArrowIcon.png');

setI18nConfig();
//hydrateAuth();

const App = () => {
  return (
    <Provider store={store}>
      <APIProvider>
        <ThemeProvider>
          <ToastProvider renderType={customToasts}>
            <TourGuideProvider
              preventOutsideInteraction
              tooltipStyle={{
                backgroundColor: 'transparent',
                paddingRight: '20%',
              }}
              tooltipComponent={props => (
                <View
                  style={{
                    height: verticalScale(80),
                    width: scale(240),
                    backgroundColor: 'black',
                    borderRadius: scale(8),
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // paddingVertical: scale(10),
                    paddingHorizontal: scale(15),
                    marginLeft:
                      props.currentStep.order === 4
                        ? scale(110)
                        : props.currentStep.order === 5
                        ? scale(160)
                        : 0,
                  }}
                >
                  <Text
                    style={[
                      {
                        color: theme.colors.background,
                      },
                      textStyle.b5,
                    ]}
                  >
                    {props.currentStep.text}
                  </Text>
                  <View
                    flexDirection={'row'}
                    width={'100%'}
                    style={{marginTop: scale(15)}}
                    justifyContent={'space-between'}
                  >
                    <View flexDirection={'row'}>
                      {props.isLastStep ? (
                        <TouchableOpacity
                          onPress={props.handleStop}
                          style={{
                            justifyContent: 'center',
                            height: 20,
                            width: 60,
                            marginLeft: scale(5),
                          }}
                        >
                          <Text
                            style={[{color: theme.colors.white}, textStyle.b5]}
                          >
                            {'Finish up'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={props.handleNext}
                            style={{
                              justifyContent: 'center',
                              height: 20,
                              width: 50,
                            }}
                          >
                            <Text
                              style={[
                                {color: theme.colors.white},
                                textStyle.b5,
                              ]}
                            >
                              {'Next'}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={props.handleStop}
                            style={{
                              justifyContent: 'center',
                              height: 20,
                              width: 60,
                            }}
                          >
                            <Text
                              style={[
                                {color: theme.colors.grey2},
                                textStyle.b5,
                              ]}
                            >
                              {'Skip'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                    <Text
                      fontSize={scale(11)}
                      style={{color: theme.colors.grey2}}
                    >
                      {`0${props.currentStep.order}/05`}
                    </Text>
                  </View>
                  <Image
                    source={ArrowDownIcon}
                    style={{
                      position: 'absolute',
                      bottom: -15,
                      left:
                        props.currentStep.order === 5 ? scale(55) : scale(10),
                      height: scale(30),
                      width: scale(30),
                      tintColor: 'black',
                    }}
                  />
                </View>
              )}
              {...{borderRadius: 16, backdropColor: 'transparent'}}
            >
              <RootNavigator />
              <FlashMessage position="top" />
            </TourGuideProvider>
          </ToastProvider>
        </ThemeProvider>
      </APIProvider>
    </Provider>
  );
};

export default App;
