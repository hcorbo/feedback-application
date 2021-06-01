import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

export const CampaignContext = React.createContext();

export const CampaignProvider = (props) => {
    const timer = require('react-native-timer');
    const [independentState, setIndependentState] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [dependentQuestion, setCurrentDependentQuestion] = useState(0);
    const [name, setName] = useState("test");
    const [startDate, setStartDate] = useState("DateTime");
    const [endDate, setEndDate] = useState("DateTime");
    const [userResponses, setUserResponses] = useState([]);
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

        fetch("https://si-main-server.herokuapp.com/api/campaign/" + campaignId, {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log("response");
                setName(res.Name);
                setEndDate(res.EndDate);
                setQuestions(res.Questions);
                setIndependentState(false);
            });
    }


     
    //const PingIntervalValue = await  AsyncStorage.getItem('PingInterval');
    const timerFunction = () => {
        const timer = setTimeout(() => {
            getDependentQuestions();
          }, 5000);
      //Postaviti timeout na ping umjesto 5000
          return () => clearTimeout(timer);
    }

    


     

    const getDependentQuestions = async () => {
      

        //fetch("https://si-main-server.herokuapp.com/api/device/dependent/get/1", {
        fetch("https://si-main-server.herokuapp.com/api/campaign/2", {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log("DEPENDENT RESPONSE");
                
                //setDependentQuestions(res.Questions);
                if(res.Questions != null && res.Questions.length != 0) {
                    setQuestions(res.Questions);
                    //setCurrentQuestion(0);
                    setIndependentState(true);
                    //stopTimer();
                    //clearTimeout(timerFunction.timer);
                } 
               
            });
    }

 //Dodati saveDependentAnswer
    const saveAnswer = async () => {
        const campaignId = await AsyncStorage.getItem('CampaignID');

        var data = [];
        for (var i = 0; i < userResponses.length; i++) {
            if (i == userResponses.length - 1) {
                try {
                    let response = await fetch("https://si-main-server.herokuapp.com/api/response/save", {
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
      
    }

    const saveDependentAnswer = async () => {
        //rađeno sa kampanjom 2 umjesto liste zavisnih jer jos nisu odvojena zavisna pitanja
        const campaignId = 2;

        var data = [];
        for (var i = 0; i < userResponses.length; i++) {
            if (i == userResponses.length - 1) {
                try {
                    let response = await fetch("https://si-main-server.herokuapp.com/api/response/save", {
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
      
    }


    const addAnswer = (answer) => {
        let rows;
        Array.isArray(answer) ? rows = [...userResponses, ...answer] : rows = [...userResponses, answer];
        /*console.log("Duzina" + answer.length);
        console.log(answer)
        console.log(rows)*/
        setUserResponses(rows);
    };

    //
    const addDependentAnswer = (answer) => {
        let rows;
        Array.isArray(answer) ? rows = [...userResponses, ...answer] : rows = [...userResponses, answer];
        /*console.log("Duzina" + answer.length);
        console.log(answer)
        console.log(rows)*/
        setUserResponses(rows);
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
        getQuestions,
        getDependentQuestions,
        //Dodati addDependentAnswer
        addAnswer,
        getNextQuestion,
        getPreviousQuestion,
        //Dodati saveDependentAnswer
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
