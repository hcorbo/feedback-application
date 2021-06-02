import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonContainer from '../ButtonContainer';
import { RadioButton } from 'react-native-paper';
import { CampaignContext } from '../contexts/CampaignContext'

const MultipleChoiceQuestionScreen = ({ question, navigation }) => {
  const [answers, setAnswers] = useState([{ "QuestionId": question.QuestionId, "AnswerId": 0, "CustomAnswer": null }]);
  const [previousValue, setPreviousValue] = useState(false);
  var [checked, setChecked] = React.useState([]);

  const { userResponses } = useContext(CampaignContext);

  if (!previousValue) {
    setPreviousValue(true);
    let rows = userResponses.filter(response => response.QuestionId == question.QuestionId);
    rows.forEach(answer => setChecked(prevState => ([...prevState, answer.AnswerId])));
    setAnswers(prevState => ([...prevState, ...rows]));
  }

  return (
    <View>
      <View style={styles.question}>
        <Text style={styles.text_question}>{question.QuestionText}</Text>
        <Text></Text>
        <View style={styles.action}>
          {
            question.QuestionAnswers.map((answer) => (
              <TouchableOpacity key={answer.AnswerId}>
                <View style={styles.button_container}>
                  <View style={{ flex: 0 }}>
                    <RadioButton
                      value={answer.AnswerId}
                      status={checked.find(element => element === answer.AnswerId) ? 'checked' : 'unchecked'}
                      onPress={() => { checked.find(element => element === answer.AnswerId) ? (setChecked(prevState => (prevState.filter(element => element != answer.AnswerId)), setAnswers(prevState => (prevState.filter(element => element.AnswerId != answer.AnswerId))))) : (setChecked(prevState => ([...prevState, answer.AnswerId]), setAnswers(prevState => ([...prevState, { "QuestionId": question.QuestionId, "AnswerId": answer.AnswerId, "CustomAnswer": null }])))) }}
                    />
                  </View>
                  <View style={{ flex: 1, marginTop: 5 }}>
                    <Text style={styles.text_footer}>{answer.Answer.AnswerText}</Text>
                  </View>
                </View>
                {/* <ChoiceComponent question={answer} /> */}
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
      <ButtonContainer answer={answers} navigation={navigation} />
    </View>
  )
};

export default MultipleChoiceQuestionScreen;

const styles = StyleSheet.create({
  question: {
    height: '90%',
    justifyContent: 'center'
  },
  text_footer: {
    color: '#fff',
    fontSize: 18
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  button_container: {
    flexDirection: "row"
  },
  text_question: {
    color: "#fff",
    paddingBottom: 40,
    fontSize: 20,
    alignSelf: 'center',
  }
});
