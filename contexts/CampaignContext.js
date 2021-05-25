import React, { useState } from 'react';

export const CampaignContext = React.createContext();

export const CampaignProvider = (props) => {
    const [campaignId, setCampaignId] = useState(1);
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

        

        fetch("https://si-main-server.herokuapp.com/api/campaign/1", {
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                console.log("response");
                setCampaignId(res.CampaignID);
                setName(res.Name);
                setEndDate(res.EndDate);
                setQuestions(res.Questions);
            });
    }

    const saveAnswer = async () => {

       questions.forEach(element => {
           if (questions.length==1){
               data={ 
                "QuestionId": element.QuestionId,
                "AnswarId": element.AnswarId,
                "CustomAnswer" :null
               }
           }else{
           data=data + "," + { 
               "QuestionId": element.QuestionId,
               "AnswarId": element.AnswarId,
               "CustomAnswer" :null
              }
            }
       });

      try{
        let response= await fetch("https://si-main-server.herokuapp.com/api/response/save", {
            method: 'POST',
            headers: {
                'Content-type':'application/json; charset=UTF=8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "CampaignId" : campaignId,
                "UserResponses" : [data]
            }) 
        });
        var json = await response.json();
      } catch (error) {
        console.error(error);
      }
    }

    const addAnswer = (answer) => {
        let rows;
        Array.isArray(answer) ? rows = [...userResponses, ...answer] : rows = [...userResponses, answer];
        console.log("Duzina" + answer.length);
        console.log(answer)
        console.log(rows)
        setUserResponses(rows);
    };

    const getNextQuestion = () => {
        if (currentQuestion < questions.length - 1)
            setCurrentQuestion(currentQuestion + 1);
    };

    const getPreviousQuestion = () => {
        if (currentQuestion > 0)
            setCurrentQuestion(currentQuestion - 1);
    };

    const values = {
        campaignId,
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
