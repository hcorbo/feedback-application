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
    const [questionForScreen, setQuestionForScreen] = useState(questions[currentQuestion]);

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

     

    const getDependentQuestion = () => {
        //console.log("depQuestion je ", dependentQuestion);
        if(dependentQuestion == null && !dependentState) {
            console.log("Dependent");
            setDependentQuestion( {
                "QuestionId": 6,
                "QuestionType": "Scale",
                "QuestionText": "Koliko ste zadovoljni cijenama?",
                "IsDependent": false,
                "Data1": null,
                "Data2": null,
                "Data3": null,
                "QuestionAnswers": [
                    {
                        "QuestionId": 6,
                        "AnswerId": 10,
                        "Answer": {
                            "AnswerId": 10,
                            "AnswerText": "5",
                            "IsAPicture": false,
                            "Base64": null
                        }
                    }
                ]
            });
            setDependentState(true);
            console.log("Dep state je ", dependentState);
        }
        
        /*async () => {
 
        fetch("https://si-projekat2.herokuapp.com/api/device/dependent/get/1", {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log("DEPENDENT RESPONSE");
                console.log("Ping" + ping);
                if(res != null && !dependentState) {
                    setDependentQuestion(res);
                    setDependentState(true);
                }
               
            });*/
            

    }


    /*const saveAnswer = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');
        const deviceId = await AsyncStorage.getItem('DeviceId');

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

    /*const saveDependentAnswer = async () => {
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

    }*/

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
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion+1);
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

    const chooseQuestionForScreen = () => {
        if(!dependentQuestionShown && dependentState) {
            setQuestionForScreen(dependentQuestion);
          } else {
            setQuestionForScreen(questions[currentQuestion]);
          }
    }


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
        chooseQuestionForScreen,
        questionForScreen
    }

    return (
        <CampaignContext.Provider value={values}>
            {props.children}
        </CampaignContext.Provider>
    );
}
