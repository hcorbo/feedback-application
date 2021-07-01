import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ButtonContainer from '../ButtonContainer';
import {LinearGradient} from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';
import { RadioButton } from 'react-native-paper';
import { CampaignContext } from '../contexts/CampaignContext'

const MultipleChoiceQuestionScreen = ({ question, navigation }) => {
  const [answers, setAnswers] = useState([{ "QuestionId": question.QuestionId, "AnswerId": 0, "CustomAnswer": null }]);
  const [previousValue, setPreviousValue] = useState(false);
  var [checked, setChecked] = React.useState([]);
  const [answersCount, setAnswersCount] = useState(question.QuestionAnswers);

  const { userResponses } = useContext(CampaignContext);

  if (!previousValue) {
    setPreviousValue(true);
    let rows = userResponses.filter(response => response.QuestionId == question.QuestionId);
    rows.forEach(answer => setChecked(prevState => ([...prevState, answer.AnswerId])));
    setAnswers(prevState => ([...prevState, ...rows]));
  }

  return (
      <View>
        <Animatable.View style={styles.header}
                         animation="bounceIn"
                         duraton="1500"
        >
          <View style={styles.question}>
            <Text style={styles.text_question}>{question.QuestionText}</Text>
            <View style={styles.action}>
              {
                question.QuestionAnswers.map((answer) => (
                    <TouchableOpacity
                        key={answer.AnswerId}
                        style={[styles.button, {height: 100. / answersCount.length + '%'}]}
                        onPress={() => {
                          checked.find(element => element === answer.AnswerId) ?
                              (setChecked(prevState => (prevState.filter(element => element != answer.AnswerId)), setAnswers(prevState => (prevState.filter(element => element.AnswerId != answer.AnswerId))))) :
                              (setChecked(prevState => ([...prevState, answer.AnswerId]), setAnswers(prevState => ([...prevState, {"QuestionId": question.QuestionId, "AnswerId": answer.AnswerId, "CustomAnswer": null}]))))
                          }
                        }
                    >
                      {!answer.Answer.IsAPicture &&
                      <LinearGradient
                          colors={checked.includes(answer.AnswerId) ? ['#808080', '#808080'] : ['#ededed', '#d3d3d3']}
                          style={checked.includes(answer.AnswerId) ? [styles.pressed_button] : [styles.unpressed_button]}>
                        <Text style={styles.text_answer}>{answer.Answer.AnswerText}</Text>
                      </LinearGradient>}
                      {answer.Answer.IsAPicture &&
                      <Image
                          style={checked.includes(answer.AnswerId) ? [styles.button_image_pressed] : [styles.button_image_unpressed]}
                          resizeMode="stretch"
                          source={{ uri: "data:image/png;base64," + answer.Answer.Base64 }}>
                      </Image>}
                    </TouchableOpacity>
                ))
              }
            </View>
          </View>
        </Animatable.View>
        <ButtonContainer answer={answers} navigation={navigation}/>
      </View>
  )
};

export default MultipleChoiceQuestionScreen;

const styles = StyleSheet.create({
  header: {
    margin: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
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
    justifyContent: 'space-evenly'
  },
  button_container: {
    flexDirection: "row"
  },
  text_question: {
    color: "#fff",
    padding: 20,
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center'
  },
  unpressed_button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
  },
  pressed_button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 5,
  },
  button: {
    alignSelf: 'center',
    width: '100%',
    padding: 2
  },
  button_image_unpressed: {
    alignSelf: 'center',
    height: '100%',
    aspectRatio: 1,
    borderRadius: 10
  },
  button_image_pressed: {
    alignSelf: 'center',
    height: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 5,
  }
});
