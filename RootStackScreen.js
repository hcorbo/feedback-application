import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import QuestionsScreen from './QuestionsScreen';
import EndScreen from './EndScreen';
import { CampaignProvider } from './contexts/CampaignContext'

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {

    const [isConfigFileCreated, setConfigFileStatus] = React.useState(false);

    useEffect(() => {
        checkConfigFile();
    }, [])

    const checkConfigFile = async () => {
        try {
            const deviceID = await AsyncStorage.getItem('DeviceId');
            if (deviceID != null) {
                setConfigFileStatus(true);
            }
        }
        catch (e) {
            console.log('Dobavljanje iz AsyncStorage neuspjesno!')
            console.log(e);
        }
    }

    return (
        <CampaignProvider>
            <RootStack.Navigator headerMode='none'>
                <RootStack.Screen name="SignInScreen" component={SignInScreen} />
                <RootStack.Screen name="QuestionsScreen" component={QuestionsScreen} />
                <RootStack.Screen name="EndScreen" component={EndScreen} />
            </RootStack.Navigator>
        </CampaignProvider>
    );
}

export default RootStackScreen;