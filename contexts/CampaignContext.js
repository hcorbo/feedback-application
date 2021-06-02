import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

export const CampaignContext = React.createContext();

export const CampaignProvider = (props) => {
    const timer = require('react-native-timer');
    const [ping, setPing] = useState(0);
    const [prvoUcitavanjeZavisnih, setPrvoUcitavanjeZavisnih] = useState(0);
    const [independentState, setIndependentState] = useState(false);
    const [globalState, setGlobalState] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [dependentQuestion, setCurrentDependentQuestion] = useState([]);
    const [name, setName] = useState("test");
    const [startDate, setStartDate] = useState("DateTime");
    const [endDate, setEndDate] = useState("DateTime");
    const [userResponses, setUserResponses] = useState([]);
    const [userDependentResponses, setUserDependentResponses] = useState([]);
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
    const [dependentQuestions, setDependentQuestions] = useState([{
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
                setIndependentState(false);
            });

        const PingIntervalValue = await  AsyncStorage.getItem('PingInterval');
        setPing(PingIntervalValue);
    }


    
    const timerFunction = () => {
        const timer = setTimeout(() => {
            getDependentQuestions();
          }, parseFloat(ping));
          return () => clearTimeout(timer);
    }

     

    const getDependentQuestions = async () => {
 
        fetch("https://si-projekat2.herokuapp.com/api/question/dependents", {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log("DEPENDENT RESPONSE");
                console.log("Ping" + ping);
                console.log(dependentQuestions.length);
                
                if(res.length != 0) {
                    if( (globalState && res.length!= dependentQuestions.length) || !globalState) {
                        setPrvoUcitavanjeZavisnih(prvoUcitavanjeZavisnih+1);
                        setDependentQuestions(res);
                        setGlobalState(true);
                        setIndependentState(true);
                    }

                    
                } 
               
            });
    }


    /*const saveAnswer = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');

        var data = [];
        for (var i = 0; i < userResponses.length; i++) {
            if (i == userResponses.length - 1) {
                try {
                    let response = await fetch("https://si-main-server.herokuapp.com/api/device/response/save", {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            "CampaignId": campaignId,
                            "UserResponses": data
                        })
                    });
                    var json = await response.json();
                    console.log(json)
                } catch (error) {
                    console.error(error);
                }
            }
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
        console.log(JSON.stringify({
            "CampaignId": campaignId,
            "UserResponses": data
        }))
      
    }*/

    const saveAnswer = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');
        const deviceId = await AsyncStorage.getItem('DeviceId');

        var data = [];
        for (var i = 0; i < userResponses.length; i++) {
            if (i == userResponses.length - 1) {
                try {
                    let response = await fetch("https://si-projekat2.herokuapp.com/api/device/response/save", {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            "CampaignId": campaignId,
                            "DeviceId": deviceId,
                            "UserResponses": data
                        })
                    });
                    var json = await response.json();
                    console.log(json)
                } catch (error) {
                    console.error(error);
                }
            }
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
        console.log(JSON.stringify({
            "CampaignId": campaignId,
            "UserResponses": data
        }))

    }


    /*const saveDependentAnswer = async () => {
        var data = [];
        for (var i = 0; i < userDependentResponses.length; i++) {
            if (i == userDependentResponses.length - 1) {
                try {
                    let response = await fetch("https://si-main-server.herokuapp.com/api/device/response/save", {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            "CampaignId": 1,
                            "UserResponses": data
                        })
                    });
                    var json = await response.json();
                    console.log(json)
                } catch (error) {
                    console.error(error);
                }
            }
           if (userDependentResponses[i].CustomAnswer != null) {
               data.push({
                   "QuestionId": useuserDependentResponsesResponses[i].QuestionId,
                   "AnswerId": -1,
                   "CustomAnswer": userDependentResponses[i].CustomAnswer
               })
           } else {
                data.push({
                    "QuestionId": userDependentResponses[i].QuestionId,
                    "AnswerId": userDependentResponses[i].AnswerId,
                    "CustomAnswer": null
                })
           }
        }
        console.log(JSON.stringify({
            "CampaignId": 1,
            "UserResponses": data
        }))
      
    }*/

    const saveDependentAnswer = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');
        const deviceId = await AsyncStorage.getItem('DeviceId');

        var data = [];
        for (var i = 0; i < userDependentResponses.length; i++) {
            if (i == userDependentResponses.length - 1) {
                try {
                    let response = await fetch("https://si-projekat2.herokuapp.com/api/device/response/save", {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            "CampaignId": campaignId,
                            "DeviceId": deviceId,
                            "UserResponses": data
                        })
                    });
                    var json = await response.json();
                    console.log(json)
                } catch (error) {
                    console.error(error);
                }
            }
            if (userDependentResponses[i].CustomAnswer != null) {
                data.push({
                    "QuestionId": userDependentResponses[i].QuestionId,
                    "AnswerId": -1,
                    "CustomAnswer": userDependentResponses[i].CustomAnswer
                })
            } else {
                data.push({
                    "QuestionId": userDependentResponses[i].QuestionId,
                    "AnswerId": userDependentResponses[i].AnswerId,
                    "CustomAnswer": null
                })
            }
        }
        console.log(JSON.stringify({
            "CampaignId": campaignId,
            "UserResponses": data
        }))

    }

    const addAnswer = (answer) => {
        let rows;
        Array.isArray(answer) ? rows = [...userResponses, ...answer] : rows = [...userResponses, answer];
        /*console.log("Duzina" + answer.length);
        console.log(answer)
        console.log(rows)*/
        setUserResponses(rows);
    };

    
    const addDependentAnswer = (answer) => {
        let rows;
        Array.isArray(answer) ? rows = [...userDependentResponses, ...answer] : rows = [...userDependentResponses, answer];
        setUserDependentResponses(rows);
    };

    const getNextQuestion = () => {
        if (currentQuestion < questions.length - 1){
            setCurrentQuestion(currentQuestion + 1);
            return false;
        }
        return true;
    };

   /* const getNextDependentQuestion = () => {
        if (currentDependentQuestion < dependentQuestions.length - 1){
            setCurrentDependentQuestion(currentDependentQuestion + 1);
            return false;
        }
        return true;
    };*/

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
        userDependentResponses,
        dependentQuestions,
        getQuestions,
        setQuestions,
        getDependentQuestions,
        addDependentAnswer,
        addAnswer,
        getNextQuestion,
        getPreviousQuestion,
        saveDependentAnswer,
        saveAnswer,
        timerFunction,
        independentState,
        setCurrentQuestion
    }

    return (
        <CampaignContext.Provider value={values}>
            {props.children}
        </CampaignContext.Provider>
    );
}
