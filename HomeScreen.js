import React from 'react';
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
import ButtonContainer from './ButtonContainer';

const HomeScreen = ({ navigation }) => {
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
        <TouchableOpacity onPress={()=> navigation.navigate('QuestionsScreen')}>
          <LinearGradient
            colors={['#ededed', '#d3d3d3']}
            style={styles.start}
          >
            <Text style={styles.textStart}>Start Answering</Text>
            <MaterialIcons
              name="navigate-next"
              color="#000000"
              size={20}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.17;

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
  }
});