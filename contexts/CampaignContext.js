import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

export const CampaignContext = React.createContext();

export const CampaignProvider = (props) => {
    const timer = require('react-native-timer');
    const [ping, setPing] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [name, setName] = useState("test");
    const [startDate, setStartDate] = useState("DateTime");
    const [endDate, setEndDate] = useState("DateTime");
    const [userResponses, setUserResponses] = useState([]);
    const [dependentState, setDependentState] = useState(false); // da li se desilo dohvatanje dependent pitanja
    const [dependentQuestion, setDependentQuestion] = useState(null);
    
    
    const [questions, setQuestions] = useState([{
        QuestionId: 1,
        QuestionType: "single-answer",
        QuestionText: "Primjer pitanja",
        IsDependent: false,
        Data1: null, //ovaj podatak će biti razlicit od null kada pitanje bude zavisno odnosno IsDependend atribut bude true
        Data2: null,
        Data3: null,
        QuestionAnswers: [
            {
                AnswerId: 1,
                Answer: {
                    AnswerText: "test",
                    IsApicture: false
                },
            },
        ]
    },
    ]);

    const getQuestions = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');
        console.log(campaignId);
        console.log("Pozvano getQuestions");

        fetch("https://si-projekat2.herokuapp.com/api/campaign/" + campaignId, {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log("response");
                setName(res.Name);
                setEndDate(res.EndDate);
                setQuestions(res.Questions);
                //setIndependentState(false);
            });

        const PingIntervalValue = await  AsyncStorage.getItem('PingInterval');
        setPing(PingIntervalValue);
    }


    
    const timerFunction = () => {
        const timer = setTimeout(() => {
            getDependentQuestion();
          }, parseFloat(ping));
          return () => clearTimeout(timer);
    }

     

    const getDependentQuestion = async () => {
        const deviceId = await AsyncStorage.getItem('DeviceId');
        if(dependentQuestion == null && !dependentState) {
            fetch("https://si-projekat2.herokuapp.com/api/device/dependent/get/" + deviceId, {
                    method: 'GET',
                }).then(res => res.json())
                    .then(res => {
                        console.log("DEPENDENT RESPONSE");
                        console.log("Ping" + ping);
                        if(res != null && !dependentState) {
                            setDependentQuestion(res.Questions[0]);
                            setDependentState(true);
                        }
                       
            });
        }
    }


    const saveAnswerFromLocalData = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');
        const deviceId = await AsyncStorage.getItem('DeviceId');
        var localResponses = await AsyncStorage.getItem('UserResponses');


        try {
            let response = await fetch("https://si-projekat2.herokuapp.com/api/device/response/save", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "CampaignId": campaignId,
                    "Duration": "12",
                    "DeviceId": deviceId,
                    "UserResponses": JSON.parse(localResponses)
                })
            });
            var json = await response.json();
            await AsyncStorage.setItem('UserResponses', JSON.stringify([]));
            alert("Odgovori uspješno poslani na server!");
            console.log(json)
        } catch (error) {
            console.error(error);
        }

    }

    const saveAnswer = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');
        const deviceId = await AsyncStorage.getItem('DeviceId');
        await AsyncStorage.setItem('UserResponses', JSON.stringify([]));
        var data = [];

        for (var i = 0; i < userResponses.length; i++) {
            if (userResponses[i].CustomAnswer != null) {
                data.push({
                    "QuestionId": userResponses[i].QuestionId,
                    "AnswerId": -1,
                    "CustomAnswer": userResponses[i].CustomAnswer
                })
            } else {
                data.push({
                    "QuestionId": userResponses[i].QuestionId,
                    "AnswerId": userResponses[i].AnswerId,
                    "CustomAnswer": null
                })
            }
        }
        try {
            let response = await fetch("https://si-projekat2.herokuapp.com/api/device/response/save123", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "CampaignId": campaignId,
                    "Duration": "12",
                    "DeviceId": deviceId,
                    "UserResponses": data
                })
            });
            var json = await response.json();
            console.log(json)
        } catch (error) {
            await AsyncStorage.setItem('UserResponses', JSON.stringify(userResponses));
            alert("Odgovori su spaseni u lokalnoj bazi!");
        }
    }



    const addAnswer = (answer) => {
        let id;
        Array.isArray(answer) ? id = answer[0].QuestionId : id = answer.QuestionId;

        let rows = userResponses;
        rows = rows.filter(response => response.QuestionId != id);

        if (Array.isArray(answer)) answer.shift();

        let rows2;
        Array.isArray(answer) ? rows2 = [...rows, ...answer] : rows2 = [...rows, answer];
        setUserResponses(rows2);
    };

    

    const getNextQuestion = () => {
        if (currentQuestion < questions.length - 1 || dependentState==true) {
            if(dependentQuestion && questions[currentQuestion+1].QuestionId == dependentQuestion.QuestionId && !(currentQuestion < questions.length - 2))
                return true;
            if(dependentQuestion && questions[currentQuestion+1].QuestionId == dependentQuestion.QuestionId)
                setCurrentQuestion(currentQuestion+2);
            else if(dependentState!=true)
                setCurrentQuestion(currentQuestion+1);
            else 
                setDependentState(false)
            console.log("TRENUTNO STANJE " + currentQuestion)
            return false;
        }
        return true;
    };

    const resetUserData = () => {
        setCurrentQuestion(0);
        setUserResponses([]);
        setUserDependentResponses([]);
    }


    const getPreviousQuestion = () => {
        if (currentQuestion > 0)
            setCurrentQuestion(currentQuestion - 1);
    };


    const values = {
        name,
        startDate,
        endDate,
        questions,
        currentQuestion,
        userResponses,
        dependentQuestion,
        dependentState,
        getDependentQuestion,
        setDependentQuestion,
        getQuestions,
        setQuestions,
        addAnswer,
        getNextQuestion,
        getPreviousQuestion,
        saveAnswer,
        timerFunction,
        setCurrentQuestion,
        resetUserData,
        setDependentState,
        saveAnswerFromLocalData
    }

    return (
        <CampaignContext.Provider value={values}>
            {props.children}
        </CampaignContext.Provider>
    );
}
