import {StyleSheet, Platform} from 'react-native';
import {Dimensions} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default StyleSheet.create({
  // header styles
  imagestyle: {
    height: scale(50),
    width: scale(50),
  },
  header: {
    padding: moderateScale(15),
    flexDirection: 'row',
    marginTop: moderateScale(5),
    backgroundColor: '#000',
    // height: windowheight / 12,
    height: verticalScale(50),
    width: windowwidth,
    alignItems: 'center',
    borderBottomWidth: moderateScale(2),
    borderColor: '#626262',
  },
  profilePhoto: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(20),
  },
  profilePhoto2: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(20),
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    //  marginBottom: 10,
    height: windowwidth / 10,
    marginTop: 10,
    paddingLeft: 20,
    width: windowwidth / 1.5,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  bottomPart: {
    height: windowheight / 2,
    backgroundColor: 'black',
    paddingHorizontal: moderateScale(10),
  },
  proBtn:{
    position: 'absolute',
    bottom: verticalScale(20),
    alignItems: 'center',
    width: '100%',
    left: 0,
  }
,
  dollarInput: {
    color: '#33d8b6',
    fontSize: moderateScale(10),
    textAlign: 'center',
    marginTop: moderateScale(-5),
    padding: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerSecond: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
    padding: moderateScale(10),
  },
  FlexSix: {
    flex: 6,
  },
  FlexFour: {
    flex: 4,
  },
  catDiv: {
    width: scale(100),
    height: verticalScale(100),
    marginRight: moderateScale(5),
    marginBottom: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: '#F3F2F1',
  },
  BTitle: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
    fontWeight: 'bold',
  },
  arrowImg: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  mRight: {
    marginRight: moderateScale(15),
  },
  arrowImgBack: {
    height: moderateScale(10),
    width: moderateScale(10),
  },
  menuImg: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginLeft: 'auto',
  },

  //----
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: windowheight / 1.4,
    width: windowwidth / 1.1,
    margin: moderateScale(10),
    backgroundColor: 'white',
    // borderRadius: 20,
    //  padding: 35,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    paddingTop: moderateScale(40),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView2: {
    height: windowheight / 1.2,
    width: windowwidth / 1.07,
    margin: 0,
    backgroundColor: 'white',
    // borderRadius: 20,
    //  padding: 35,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginHorizontal: moderateScale(10),
    paddingTop: 0,
    // paddingLeft: 10,
    // paddingRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    elevation: 2,
    marginTop: moderateScale(10),
    backgroundColor: 'green',
  },
  uploadedPic: {
    height: windowheight / 3,
    width: windowwidth / 1.1,
  },

  flexRowSc: {
    flexDirection: 'row',
    //  paddingRight: 10,
    //  paddingLeft: 10,
    //  justifyContent: "space-between",
    // height: windowheight/5,
    // alignItems: 'center',
  },
  modal2View: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowheight / 6,
    margin: moderateScale(3),
    borderWidth: moderateScale(2),
    paddingTop: moderateScale(4),
    paddingLeft: moderateScale(12),
    borderColor: 'white',
    backgroundColor: '#F3F2F1',
    flex: 4,
  },
  modal1suggestion: {
    flexDirection: 'row',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5),
  },
  modal1fpp: {
    flexDirection: 'row',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
  },
  modal1fppm: {
    flexDirection: 'row',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
    marginTop: moderateScale(25),
    marginBottom: moderateScale(5),
  },
  modal1mfa: {
    marginTop: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
  },
  modal1Txthead: {
    paddingLeft: moderateScale(4),
    fontWeight: '600',
  },
  container10: {
    flex: 1,
    alignItems: 'center',
  },
  pic1: {
    height: windowheight / 4,
    width: windowwidth / 2.1,
  },

  pic2: {
    height: windowheight / 3,
    width: windowwidth / 2.3,
  },
  FlexTwo: {
    flex: 2,
  },
  flexRow: {
    flexDirection: 'row',
    padding: moderateScale(10),
  },

  paddingAround: {
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
  },

  mainSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowwidth,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    paddingRight: moderateScale(20),
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(15),
  },
  jaCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hwSixty: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  input: {
    // fontSize:12,
    marginBottom: moderateScale(10),
    height: windowwidth / 10,
    marginTop: moderateScale(10),
    //   paddingLeft: 20,
    width: windowwidth / 1.5,
    borderRadius: moderateScale(15),
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#000',
    width: windowwidth,
  },
  hwSixtyy: {
    height: moderateScale(100),
    width: moderateScale(100),
    marginRight: moderateScale(10),
    borderRadius: moderateScale(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  input2: {
    marginBottom: moderateScale(10),
    height: windowwidth / 10,
    marginTop: moderateScale(10),
    width: windowwidth / 1.2,
    borderRadius: moderateScale(15),
    backgroundColor: '#fff',
  },

  // modal 2
  saveBtnSc: {
    fontWeight: '500',
    color: '#39E3BF',
  },
  topperSc: {
    margin: 0,
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    marginTop: moderateScale(0),
    paddingVertical: moderateScale(20),
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  ScDate: {
    fontSize: moderateScale(12),
  },

  mlAuto: {
    marginLeft: 'auto',
  },
  mrAuto: {
    marginRight: 'auto',
  },

  pr11: {
    paddingRight: 11,
  },

  input3: {
    height: windowheight / 15,
    marginRight: moderateScale(12),
    marginLeft: moderateScale(12),
    marginBottom: moderateScale(12),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    width: windowwidth / 1.3,
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    borderWidth: moderateScale(1),
    borderColor: 'black',
  },

  inputSearch: {
    height: windowheight / 15,
    marginRight: moderateScale(12),
    marginLeft: moderateScale(12),
    marginBottom: moderateScale(12),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    width: windowwidth / 1.3,
    borderRadius: moderateScale(20),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(95, 213, 190)',
  },
  body3: {
    flex: 1,
    backgroundColor: '#000',
    width: windowwidth,
  },
  bodyflatlist: {
    flexDirection: 'row',
    paddingTop: moderateScale(10),
    backgroundColor: '#000',
    height: verticalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyflatInner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  imageCross: {
    paddingLeft: moderateScale(40),
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  inputCross: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    //  marginBottom: 10,
    //   width:
    height: scale(35),
    marginTop: 0,
    paddingLeft: moderateScale(20),
    width: windowwidth / 1.5,
    borderRadius: moderateScale(15),
    backgroundColor: '#fff',
  },
  bodyhalf: {
    flex: 0.5,
    backgroundColor: '#000',
    width: windowwidth,
  },
  VCenter: {
    alignItems: 'center',
  },
  MView: {
    height: windowheight / 2.3,
  },

  txtTitle: {
    color: 'rgb(95, 213, 190)',
    marginBottom: moderateScale(10),
  },
  fontWeight: {
    fontWeight: '400',
  },
  f12: {
    fontSize: moderateScale(14),
    color: '#999',
  },
  recentFlat: {
    width: scale(100),
    padding: moderateScale(10),
  },
  padright: {
    paddingRight: 11,
  },
  spacer: {
    height: moderateScale(10),
    backgroundColor: '#000',
  },
});
