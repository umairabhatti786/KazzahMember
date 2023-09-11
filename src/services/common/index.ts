import Geolocation from 'react-native-geolocation-service';
import {client} from 'api/client';
import URLS from 'api/Urls';
import moment from 'moment';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Contacts from 'react-native-contacts';
import {SyncContacts, SyncContactsPro} from 'services/Connections';
import store from 'store';
import {
  setFeeds,
  setMemberContacts,
  setProviderContacts,
  setRootServices,
} from 'reducers/authReducer';
import {GetClientRootSerivce} from 'services/RootServices';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {setCategory} from 'reducers/categoryReducer';
import {GetProviderProfile} from 'services/ProviderProfile';
import {GetSchedule} from 'services/schedule';
import {getAllMedia} from 'services/Explore';
import {setCoords} from 'reducers/searchReducer';
import messaging from '@react-native-firebase/messaging';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import SimpleToast from 'react-native-simple-toast';
import qs from 'qs';
import _ from 'lodash';
Geocoder.init('AIzaSyAglXrV92BziSRF9cMUTcNMiPWw5rpp9To');

export const getFormData = (object: any) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

export const ConvertMinutes = (n: any) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  var res = ` ${rhours}  HRS  ${rminutes}  MIN`;

  if (rhours == 0) {
    res = `${rminutes} MIN`;
  }
  if (rminutes == 0) {
    res = `${rhours}  HRS`;
  }

  return res;
};

export const ConvertMinutesHours = (n: any) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  var res = ` ${rhours}  hours  ${rminutes}  minutes`;

  if (rhours == 0) {
    res = `${rminutes} minutes`;
  }
  if (rminutes == 0) {
    res = rhours == 1 ? `${rhours}  hour` : `${rhours}  hours`;
  }

  return res;
};

export const getDaysDifference = (date: Date) => {
  const currentDate = moment(new Date());
  const completedDate = currentDate?.diff(date, 'days');

  return completedDate;
};

export const fomateDateTime = (date: Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const InputValueFormat = txt => {
  if (
    txt == '$' ||
    txt.includes('-') ||
    txt.includes('.') ||
    txt.includes(',') ||
    txt.includes('+') ||
    txt.includes('*')
  ) {
    return false;
  }

  return true;
};

// export const InputValueFormat = txt => {
//   console.log('knkn', txt);

//   if (txt.includes(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>£%©®™✓°¢$¥€~`|•√π÷×¶∆])/)) {
//     return false;
//   }

//   return true;
// };

const GetSerivces = async (token: string) => {
  try {
    return await client.get(URLS.ROOT_SERVICES, {});
  } catch (error) {
    return error.response;
  }
};

const GetSerivcesByParent = async (token: string, id: number) => {
  try {
    return await client.get(`${URLS.GET_SERVICE_BY_PARENT}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
const GetSerivcesChild = async (token: string, id: number) => {
  try {
    return await client.get(`${URLS.GET_SERVICE_BY_CHILD}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

const getExplore = async (token: string) => {
  try {
    return await client.get(URLS.GET_EXPLORE, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

const getExploreDetails = async (token: string, id: number) => {
  try {
    return await client.get(`${URLS.GET_MEDIA_DETAILS}/${id}`);
  } catch (error) {
    return error.response;
  }
};

const updateMedia = async (data: any, id: any) => {
  try {
    return await client.put(`${URLS.UPDATE_MEDIA}${id}/update`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (error) {
    return error.response;
  }
};

const getCurrentAppointments = async (token: string) => {
  try {
    return await client.get(`${URLS.GET_CURRENT_APPOINTMENTS}?status=all`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

const getNotiAppointments = async (id: any, token: string) => {
  const url = `${URLS.GET_NOTI_APPOINTMENTS}${id}`;

  try {
    return await client.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};

const getAppointmentsAll = async ({
  status,
  time,
}: {
  status?: string;
  time?: string;
}) => {
  try {
    return await client.get(URLS.GET_CURRENT_APPOINTMENTS, {
      params: {
        status: status,
        timeFrame: time,
      },
    });
  } catch (error) {
    return error.response;
  }
};

// const getTodayAppointments = async (token: string) => {
//   try {
//     return await client.get(
//       `${URLS.GET_CURRENT_APPOINTMENTS}?status=all&timeFrame=present`,
//       {
//         headers: {
//           Authorization: 'Bearer ' + token,
//         },
//       },
//     );
//   } catch (error) {
//     return error.response;
//   }
// };

const getProviders = async (token: string) => {
  try {
    return await client.get(URLS.GET_ALL_PROVIDERS, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
const getProvidersAll = async () => {
  try {
    return await client.get(URLS.GET_ALL_PROVIDERS2);
  } catch (error) {
    return error.response;
  }
};

const searchProviders = async (body: any) => {
  try {
    return client.post(URLS.SEARCH_PROVIDERS, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  } catch (error) {
    return error.response;
  }
};

const updateNonKazzahProfile = async (data: string) => {
  try {
    return await client.put(URLS.UPDATE_NONKAZZAH_PROFILE, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (error) {
    return error.response;
  }
};

const getNotifications = async id => {
  try {
    return await client.get(
      `${URLS.GET_NOTIFICATIONS}?modelId=${id}&modelType=client`,
    );
  } catch (error) {
    return error.response;
  }
};
const delNotifications = async (token: string, id: any) => {
  try {
    const url = `${URLS.DEL_NOTIFICATIONS}${id}`;

    return await client.delete(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    return error.response;
  }
};
const fomateAMAPMTo24Hour = (date: string) => {
  return moment(date, 'HH:mm A').format('hh:mm:a');
};
const getNumberfromString = (string: any) => {
  var numb = string.match(/\d/g);
  numb = numb.join('');

  return numb;
};

const getCurrentCoordinates = () => {
  hasPermissionIOS();
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {
        accuracy: {android: 'high', ios: 'best'},
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  });
};

const getZoomLevelAndCoords = (radiusInMiles: any, lat: any, lon: any) => {
  const latDelta = radiusInMiles / 69;
  const lonDelta = radiusInMiles / (69 * Math.cos(lat * (Math.PI / 180)));

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: 0.008330183268125069,
    longitudeDelta: 0.004962757229776571,
    // latitudeDelta: latDelta,
    // longitudeDelta: lonDelta,
  };
};

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');
  if (status === 'granted') {
    return true;
  } else {
    locationPermissionError();
  }

  // if (status === 'denied') {
  //   Alert.alert('Location permission denied');
  // }

  // if (status === 'disabled') {
  //   Alert.alert(`Kazah`, 'Kazah wants your location permission', [
  //     {text: 'Go to Settings', onPress: openSetting},
  //     {text: "Don't Use Location", onPress: () => {}},
  //   ]);
  // }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Kazah',
      message: 'Kazah wants your location permission',
      buttonNegative: 'Cancel',
      buttonPositive: 'Allow',
      buttonNeutral: 'Ask Me Later',
    },
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  return false;
};

const getAddressFromCoordinates = async (lat: any, lng: any, level: any) => {
  try {
    const res = await Geocoder.from({
      lat,
      lng,
    });
    const {results} = res;

    return {
      formatted_address: results.reverse()[level].formatted_address,
      place_id: results.reverse()[level].place_id,
    };
  } catch (error) {
    console.log(
      '🚀 ~ file: index.ts:321 ~ getAddressFromCoordinates ~ error:',
      error,
    );
  }
};

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      if (result == 'granted') {
      } else {
        locationPermissionError();
      }
    });
  } else {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result == 'granted') {
      } else {
        locationPermissionError();
      }
    });
  }
};
const locationPermissionError = () => {
  Alert.alert(
    'Permission Not Granted',
    "You can enable location permissions on your device's settings anytime.",
    [
      {
        text: 'Go To Settings',
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
          } else {
            Linking.openSettings();
          }
        },
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ],
  );
};
const cameraPermissionError = (error: any) => {
  if (error?.code == 'E_NO_CAMERA_PERMISSION') {
    Alert.alert(
      'Permission Not Granted',
      "You can enable camera permissions on your device's settings anytime.",
      [
        {
          text: 'Go To Settings',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  }
};
const contactsPermissionError = (error: any) => {
  if (error?.code == 'E_NO_CONTACTS_PERMISSION') {
    Alert.alert(
      'Permission Not Granted',
      'Kazzah allows you to build a close network of friends who help each other find trusted pros. Access to your contacts automates the process of building your connections at your control',
      [
        {
          text: 'Go To Settings',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  }
};
const loadSyncedProviders = () => {
  if (Platform.OS == 'android') {
    check(PERMISSIONS.ANDROID.READ_CONTACTS).then(per => {
      if (per == 'granted') {
        Contacts.getAll()
          .then(async response => {
            const makeContactList = [];
            response.forEach(item => {
              makeContactList.push({
                phoneNumbers: item?.phoneNumbers[0]?.number,
              });
            });
            const phoneList = makeContactList.map(e => {
              return {
                phone: formateNumber(e.phoneNumbers),
              };
            });

            const res = await SyncContactsPro('', {
              contacts: phoneList,
            });

            store.dispatch(setProviderContacts(res.data?.data?.contacts));
          })
          .catch(e => {});
      }
    });
  } else {
    Contacts.getAll()
      .then(async response => {
        const makeContactList = [];
        response.forEach(item => {
          makeContactList.push({
            phoneNumbers: item?.phoneNumbers[0]?.number,
          });
        });

        const phoneList = makeContactList.map(e => {
          return {phone: formateNumber(e?.phoneNumbers)};
        });

        const res = await SyncContactsPro('', {
          contacts: phoneList,
        });
        store.dispatch(setProviderContacts(res.data?.data?.contacts));
      })
      .catch(e => {});
  }
};

export const formateNumber = (number: any) => {
  try {
    if (number?.length > 10) {
      return number
        ?.replace(/[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g, '')
        ?.substr(-10);
    } else {
      return number?.replace(/[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g, '');
    }
  } catch (error) {
    return number;
  }
};

const loadSyncedMember = () => {
  if (Platform.OS == 'android') {
    check(PERMISSIONS.ANDROID.READ_CONTACTS).then(per => {
      if (per == 'granted') {
        Contacts.getAll()
          .then(async response => {
            const makeContactList = [];
            response.forEach(item => {
              makeContactList.push({
                phoneNumbers: item?.phoneNumbers[0]?.number,
              });
            });

            const phoneList = makeContactList.map(e => {
              return {phone: formateNumber(e.phoneNumbers)};
            });
            const res = await SyncContacts('', {
              contacts: phoneList,
            });
            store.dispatch(setMemberContacts(res.data?.data?.contacts));
          })
          .catch(e => {});
      }
    });
  } else {
    Contacts.getAll()
      .then(async response => {
        const makeContactList = [];
        response.forEach(item => {
          makeContactList.push({
            phoneNumbers: item?.phoneNumbers[0]?.number,
          });
        });

        const phoneList = makeContactList.map(e => {
          return {phone: formateNumber(e.phoneNumbers)};
        });

        const res = await SyncContacts('', {
          contacts: phoneList,
        });
        store.dispatch(setMemberContacts(res.data?.data?.contacts));
      })
      .catch(e => {});
  }
};
const loadRootServices = async () => {
  const res = await GetClientRootSerivce('');
  if (res.data.success) {
    store.dispatch(setRootServices(res.data.data));

    let newArr = [];

    res.data.data.forEach(element => {
      newArr.push({
        name: element.rootServiceId.name,
        id: element.rootServiceId.id,
        icon: element.rootServiceId.icon,
        teamId: element.id,
        providerCount: element.providerCount,
      });
    });

    let newCategories = [...newArr];
    store.dispatch(setCategory(newCategories));
  }
};
const loadFeeds = async () => {
  const res = await getAllMedia('');
  const {success} = res.data;

  if (success) {
    const list = res?.data?.data?.filter((item: any) => {
      return item?.type == 'image';
    });
    const sortedFeeds = _.orderBy(list, item => item?.createdAt, ['desc']);

    store.dispatch(setFeeds(sortedFeeds));
  }
};
const loadCorrds = async () => {
  const position = await getCurrentCoordinates();
  store.dispatch(
    setCoords({
      lat: position?.coords?.latitude,
      long: position?.coords?.longitude,
    }),
  );
};

const getProServicesList = async (id: any) => {
  try {
    const providerProf = await GetProviderProfile('', id);

    const schedule = await GetSchedule('', id);

    const res = await GetSerivcesChild(
      '',
      providerProf.data.data.service.service.id,
    );

    const {success, data} = res.data;

    const childArr = schedule.data.data[0].services;

    var list = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      list.push({
        categoryId: element.id,
        categoryName: element.name,
        childList: childArr
          .filter(
            value => value.service?.parentId == element.id && !value.isPaused,
          )
          .map(e => {
            return {...e.service};
          }),
        icon: {uri: element.icon},
      });
    }

    list = list.filter(e => e.childList?.length).map(e => e.categoryName);

    return list;
  } catch (error) {
    console.log('🚀 ~ file: index.ts:529 ~ getProServicesList ~ error:', error);
    return [];
  }
};

const getProChannelList = async (id: any) => {
  try {
    const providerProf = await GetProviderProfile('', id);

    const schedule = await GetSchedule('', id);

    const res = await GetSerivcesChild(
      '',
      providerProf.data.data.service.service.id,
    );

    const {success, data} = res.data;

    const childArr = schedule.data.data[0].services;

    var list = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      list.push({
        categoryId: element.id,
        categoryName: element.name,
        childList: childArr
          .filter(
            value => value.service?.parentId == element.id && !value.isPaused,
          )
          .map(e => {
            return {...e.service};
          }),
        icon: {uri: element.icon},
      });
    }

    list = list.filter(e => e.childList?.length);

    return list;
  } catch (error) {
    console.log('🚀 ~ file: index.ts:529 ~ getProServicesList ~ error:', error);
    return [];
  }
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const getExtention = (filename: any) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

const downloadImage = (media: any) => {
  try {
    if (Platform.OS === 'ios') {
      SimpleToast.show('Downloading Media..');
      CameraRoll.saveToCameraRoll(media?.url)
        .then(Alert.alert('Done', 'Photo added to camera roll!'))
        .catch(err => console.log('err:', err));
    } else {
      SimpleToast.show('Downloading Media..');
      // CameraRoll.save(media?.url)
      //   .then(Alert.alert('Done', 'Photo added to camera roll!'))
      //   .catch(err => console.log('err:', err));

      let date = new Date();
      let image_URL = media?.url;
      let ext = getExtention(image_URL);
      ext = '.' + ext[0];
      const {config, fs} = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', image_URL)
        .then((res: any) => {
          SimpleToast.show('Media Downloaded Successfully.');
        })
        .catch((err: any) => {
          console.log('🚀 ~ file: index.ts:694 ~ .then ~ err:', err);
        });
    }
  } catch (error) {
    console.log('🚀 ~ file: index.ts:700 ~ downloadImage ~ error:', error);
  }
};

function getDistanceBetweenTwoPoints(cord1: any, cord2: any) {
  if (cord1.latitude == cord2.latitude && cord1.longitude == cord2.longitude) {
    return 0;
  }

  const radlat1 = (Math.PI * cord1.latitude) / 180;
  const radlat2 = (Math.PI * cord2.latitude) / 180;

  const theta = cord1.longitude - cord2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  // dist = dist * 1.609344; //convert miles to km

  return dist;
}

const getCountryCode = (phoneNumber: any) => {
  return phoneNumber?.slice(1, -10);
};

export {
  getCountryCode,
  updateNonKazzahProfile,
  GetSerivces,
  GetSerivcesByParent,
  getExplore,
  getExploreDetails,
  getProviders,
  searchProviders,
  getNotifications,
  GetSerivcesChild,
  getCurrentAppointments,
  fomateAMAPMTo24Hour,
  getNumberfromString,
  getAppointmentsAll,
  getProvidersAll,
  delNotifications,
  getNotiAppointments,
  getCurrentCoordinates,
  getZoomLevelAndCoords,
  getAddressFromCoordinates,
  locationPermissionError,
  loadSyncedProviders,
  loadSyncedMember,
  loadRootServices,
  getProServicesList,
  loadFeeds,
  getProChannelList,
  loadCorrds,
  requestUserPermission,
  requestLocationPermission,
  downloadImage,
  cameraPermissionError,
  getDistanceBetweenTwoPoints,
  contactsPermissionError,
  updateMedia,
};
