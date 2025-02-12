import React, {useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    AsyncStorage
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';


const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [isConfigFileCreated, setConfigFileStatus] = React.useState(false);

    useEffect( () => {
        checkConfigFile();
    }, [])

    const checkConfigFile = async() => {
        try{
            const deviceID = await AsyncStorage.getItem('DeviceId');
            if(deviceID != null){
                setConfigFileStatus(true);
            }
        }
        catch(e){
            console.log('Dobavljanje iz AsyncStorage neuspjesno!')
            console.log(e);
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="2000"
            source={require('./assets/logo.png')}
            style={styles.logo}
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>We collect your opinions!</Text>
            <Text style={styles.text}>Get started and setup your device</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=> {
                if(isConfigFileCreated)
                    navigation.navigate('QuestionsScreen');
                else
                    navigation.navigate('SignInScreen')
            }}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

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
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});