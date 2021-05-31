import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonContainer from '../ButtonContainer';
import {LinearGradient} from "expo-linear-gradient";

const MultipleChoiceQuestionScreen = ({ question, navigation}) => {
  const [answers, setAnswers] = useState([]);
  var [checked, setChecked] = React.useState([]);
  const [answersCount, setAnswersCount] = useState(question.QuestionAnswers);

  return (
      <View>
        <View style={styles.question}>
          <Text style={styles.text_question}>{question.QuestionText}</Text>
          <View style={styles.action}>
            {
              question.QuestionAnswers.map((answer) => (
                  <TouchableOpacity
                      key={answer.AnswerId}
                      style={checked.includes(answer.AnswerId) ? [styles.pressed_button, {height: 80. / answersCount.length + '%'}] : [styles.unpressed_button, {height: 80. / answersCount.length + '%'}]}
                      onPress={() => {
                        checked.find(element => element === answer.AnswerId) ?
                            (setChecked(prevState => (prevState.filter(element => element != answer.AnswerId)), setAnswers(prevState => (prevState.filter(element => element.AnswerId != answer.AnswerId))))) :
                            (setChecked(prevState => ([...prevState, answer.AnswerId]), setAnswers(prevState => ([...prevState, {"QuestionId": question.QuestionId, "AnswerId": answer.AnswerId, "CustomAnswer": null}]))))
                      }
                      }
                  >
                    <LinearGradient colors={checked.includes(answer.AnswerId) ? ['#808080', '#808080'] : ['#ededed', '#d3d3d3']} style={[styles.button]}>
                      <Text style={styles.text_answer}>{answer.Answer.AnswerText}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
              ))
            }
          </View>
        </View>
        <ButtonContainer answer={answers} navigation={navigation}/>
      </View>
  )
};

export default MultipleChoiceQuestionScreen;

const styles = StyleSheet.create({
  question: {
    height: '90%',
    justifyContent: 'center',
  },
  text_answer: {
    color: '#000',
    fontSize: 25
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-evenly'
  },
  button_container: {
    flexDirection: "row"
  },
  text_question: {
    color: "#fff",
    paddingBottom: 40,
    fontSize: 25,
    alignSelf: 'center',
  },
  unpressed_button: {
    alignSelf: 'center',
    width: '100%',
  },
  pressed_button: {
    alignSelf: 'center',
    width: '100%',
    borderWidth: 3,
    borderRadius: 10
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000'
  }
});
