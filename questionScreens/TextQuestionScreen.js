import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import ButtonContainer from '../ButtonContainer';

const TextQuestionScreen = ({ question,navigation}) => {
  const [answerText, setAnswerText] = useState({});

  return (
    <View>
      <View style={styles.question}>
        <Text style={styles.questionText}>{question.QuestionText}</Text>
        <TextInput
          placeholder="Vaš odgovor..."
          onChangeText={(value) => { setAnswerText(value); }}
          style = {styles.input}></TextInput>
      </View>
      <ButtonContainer answer={{"QuestionId": question.QuestionId, "AnswerId": null, "CustomAnswer": answerText}} navigation={navigation} />
    </View>
  )
};

export default TextQuestionScreen;

const styles = StyleSheet.create({
  question: {
    height: '90%',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    height: 100,
    borderRadius: 10,
    fontSize: 16,
  },
  questionText: {
    paddingBottom: 40,
    fontSize: 20,
    alignSelf: 'center',
    color: 'black'
  }
});