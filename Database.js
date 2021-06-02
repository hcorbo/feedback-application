import React from 'react'
import * as SQLite from 'expo-sqlite';
import { openDatabase } from "expo-sqlite";


const db = SQLite.openDatabase("db");



const getAnswers = async () =>{
    console.log("USAO")
    var data = []
   
    await db.transaction(async function(tx) {
        await tx.executeSql("SELECT * FROM Answer",[],(_, { rows:{_array} }) => {
            for(var i = 0;i < _array.length;i++){
                data.push({
                    "QuestionId": _array[i].QuestionId,
                    "AnswerId":_array[i].AnswerId,
                    "CustomAnswer": _array[i].CustomAnswer
                })
                console.log("DATA" + _array[i].AnswerId);
                if(i == _array.length -1){
                console.log("ALLDATA: " + data);
                return data;
            }
            }
            
        })
    })
}



const deleteAnswer = () =>{
    db.transaction( tx =>{
        tx.executeSql('DELETE FROM Answer')
    })
}


const insertAnswer = (userResponses) =>{
    db.transaction( tx =>{
        for(var i = 0; i < userResponses.length;i++){
            tx.executeSql(
                'INSERT INTO Answer(AnswerId,QuestionId,CustomAnswer)' +
                ' VALUES (?,?,?)', [userResponses[i].AnswerId,userResponses[i].QuestionId,userResponses[i].CustomAnswer]
            );
        }
    })

}
 const setupDatabaseAsync =  () =>{

        db.transaction(tx => {

            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Answer(' + 
                'AnswerId integer primary key not null,' + 
                'QuestionId text not null,' +
                'CustomAnswer text' +
                ');' 
            );
        })
}

export {
    insertAnswer,
    setupDatabaseAsync,
    getAnswers,
    deleteAnswer,
}