import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import QuestionsScreen from './QuestionsScreen';
import EndScreen from './EndScreen';
import { CampaignProvider } from './contexts/CampaignContext'
import AlertComponent from './AlertComponent';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <CampaignProvider>
        <AlertComponent/>
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SplashScreen" component={SplashScreen} />
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
            <RootStack.Screen name="QuestionsScreen" component={QuestionsScreen} />
            <RootStack.Screen name="EndScreen" component={EndScreen} />
        </RootStack.Navigator>
    </CampaignProvider>
);

export default RootStackScreen;