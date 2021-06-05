import React ,{ useContext, useEffect }from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CampaignContext } from './contexts/CampaignContext'
 
const EndScreen = ({ navigation }) => {
  const { saveAnswer, saveDependentAnswer, resetUserData } = useContext(CampaignContext);

  useEffect(() => {
    async function startNewSession()
    {
      await saveAnswer();
      await saveDependentAnswer();
      resetUserData();
    }
    startNewSession();
    setTimeout(() => {
        navigation.navigate("QuestionsScreen");
      }, 3000);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.text}>Hvala Vam na izdvojenom vremenu!</Text>
      </View>
    </View>
  );
};
 
export default EndScreen;
 
const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  start: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textStart: {
    color: 'black',
    fontWeight: 'bold'
  },
  text:{
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});