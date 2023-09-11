import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
 
export const styles = StyleSheet.create({
  cardMainContainer: {
    height: scale(90),
    flex: 1,
    backgroundColor: 'white',
    margin: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
  },

  cardMainContainer2: {
    flex: 1,
    // backgroundColor: 'red',
    margin: scale(2),
    marginVertical: 2,
    alignItems: 'center',
  },
  textStyleProvider: {
    paddingBottom: scale(2),
    width: scale(50),
    color: 'white',
  },
  textStyleProviderTeam: {
    paddingBottom: verticalScale(5),
    width: scale(50),
    color: 'black',
    textAlign:"center"

  },
  textStyleServices: {
    paddingBottom: scale(2),
    width: scale(65),
    color: 'white',
  },
  textStyleProTeam:{
    paddingBottom: scale(5),
    fontWeight:"600",
    width:scale(58),
    // backgroundColor:"red",
    color: 'black',
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center"
    

  }

});

export default styles;
