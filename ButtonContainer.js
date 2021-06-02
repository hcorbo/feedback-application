import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CampaignContext } from './contexts/CampaignContext'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ButtonContainer = ({ answer,navigation}) => {

    const { globalState, setIndependentState, setQuestions, dependentQuestions, addAnswer, getNextQuestion, getPreviousQuestion, getQuestions, independentState, setCurrentQuestion, addDependentAnswer, timerFunction, questions, currentQuestion } = useContext(CampaignContext);


    return (

        <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={getPreviousQuestion}>
                <LinearGradient
                    colors={['#ededed', '#d3d3d3']}
                    style={styles.button}
                >
                    <MaterialIcons
                        name="navigate-before"
                        color="#000000"
                        size={20}
                    />
                    <Text style={styles.textButton}>Previous </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { 
                if(questions[currentQuestion].QuestionType === "Multiple")  addAnswer(answer); 
                if(independentState){
                    addDependentAnswer(answer);
                } else {
                    addAnswer(answer);
                }
                //if( independentState) setQuestions(dependentQuestions);
                if(getNextQuestion() && independentState) { 
                    //setCurrentQuestion(0);
                    //timerFunction();
                    getQuestions(); 
                     
                } 
                else if(getNextQuestion()) {
                    navigation.navigate('EndScreen'); 
                }
                else getNextQuestion();
             

            }}>
                <LinearGradient
                    colors={['#ededed', '#d3d3d3']}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Next</Text>
                    <MaterialIcons
                        name="navigate-next"
                        color="#000000"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { 
            //    addAnswer(answer); 
                navigation.navigate('EndScreen'); 
            }}>
                <LinearGradient
                    colors={['#ededed', '#d3d3d3']}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>End</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )
};

export default ButtonContainer;

const styles = StyleSheet.create({
    button: {
        width: 110,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textButton: {
        color: 'black',
        fontWeight: 'bold'
    },
    buttonsContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    }
});