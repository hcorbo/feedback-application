import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { CampaignContext } from './contexts/CampaignContext';



const AlertComponent = ({ navigation }) => {
    const [localData, setLocalData] = useState([]);
    const { saveAnswerFromLocalData } = useContext(CampaignContext);
    const [check, setCheck] = useState(false);
    const [temp, setTemp] = useState(true);


    useEffect(() => {
        getData();
    }, []);

    const clearLocalStorage = async () => {
        await AsyncStorage.setItem('UserResponses', JSON.stringify([]))
        alert("Odgovori su izbrisani iz baze!");
    }

    const createTwoButtonAlert = () => {
        if (check && temp) {
            setTemp(false);
            console.log("lokalni podaci: " + localData)
            Alert.alert(
                "Prethnodni odgovori nisu poslani na server",
                "Da li želite da ih pošaljete?",
                [
                    {
                        text: "NO",
                        onPress: () => clearLocalStorage(),
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => { saveAnswerFromLocalData(); }}
                ]
            );
        }
    }

    const getData = async () => {
        try {
            var data = await AsyncStorage.getItem('UserResponses');
            setLocalData(JSON.parse(data));
            if (data == '[]') {
                setCheck(false);
            } else setCheck(true)

        } catch (error) {

        }
    }

    return (
        <View>
            {
                check && createTwoButtonAlert()
            }
        </View>
    )
}

export default AlertComponent;