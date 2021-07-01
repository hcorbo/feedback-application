import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import ButtonContainer from '../ButtonContainer';
import { CampaignContext } from '../contexts/CampaignContext'

const TextQuestionScreen = ({ question, navigation }) => {
  const [answerText, setAnswerText] = useState("");
  const [previousValue,setPreviousValue] = useState(false);

  const { addAnswer, getNextQuestion, userResponses } = useContext(CampaignContext);

  let text = "";
  let response = userResponses.find(response => response.QuestionId == question.QuestionId);
  try {
    text = response.CustomAnswer;
  } catch(error) {

  }

  if(!previousValue) {
    setPreviousValue(true);
    setAnswerText(text);
  }

  const nextQuestion = () => {
    addAnswer({ "QuestionId": question.QuestionId, "AnswerId": null, "CustomAnswer": answerText });
    if (getNextQuestion()) navigation.navigate('EndScreen');
    else getNextQuestion();
  };

  return (
    <View>
      <View style={styles.question}>
        <Text style={styles.questionText}>{question.QuestionText}</Text>
        <TextInput
          placeholder="Vaš odgovor..."
          onChangeText={(value) => { setAnswerText(value); }}
          value={answerText}
          onSubmitEditing={nextQuestion}
          style={styles.input}></TextInput>
      </View>
      <ButtonContainer answer={null} navigation={navigation} />
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
    color: '#fff',
  }
});