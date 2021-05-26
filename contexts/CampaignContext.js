import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

export const CampaignContext = React.createContext();

export const CampaignProvider = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
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
            });
    }

    const saveAnswer = async () => {
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

    const getNextQuestion = () => {
        if (currentQuestion < questions.length - 1){
            setCurrentQuestion(currentQuestion + 1);
            return false;
        }
        return true;
    };

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
        addAnswer,
        getNextQuestion,
        getPreviousQuestion,
        saveAnswer
    }

    return (
        <CampaignContext.Provider value={values}>
            {props.children}
        </CampaignContext.Provider>
    );
}
