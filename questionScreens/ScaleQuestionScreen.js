import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import ButtonContainer from '../ButtonContainer';
import Slider from "react-native-smooth-slider";
import { CampaignContext } from '../contexts/CampaignContext'

const ScaleQuestionScreen = ({ question, navigation }) => {
  const [state, setState] = useState(1);
  const [previousValue, setPreviousValue] = useState(false);
  const { addAnswer, getNextQuestion, userResponses } = useContext(CampaignContext);

  let number = 1;
  let response = userResponses.find(response => response.QuestionId == question.QuestionId);
  try {
    number = Number(response.CustomAnswer);
  } catch (error) {

  }

  if (!previousValue) {
    setPreviousValue(true);
    setState(number);
  }

  const nextQuestion = () => {
    addAnswer({ "QuestionId": question.QuestionId, "AnswerId": -1, "CustomAnswer": state });
    if (getNextQuestion()) navigation.navigate('EndScreen');
    else getNextQuestion();
  };

  return (
    <View>
      <View style={styles.question}>
        <Text style={styles1.text}>{question.QuestionText}</Text>
        <View >
          <Slider
            style={{ width: 300, height: 80, alignSelf: 'center', }}
            minimumValue={1}
            maximumValue={10}
            thumbStyle={{ width: 30, height: 50 }}
            trackStyle={{ height: 50 }}
            value={Number(state)}
            onValueChange={(value) => setState(value.toFixed(0))}
            onSlidingComplete={nextQuestion}
            thumbTintColor="#f0eff3"
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View style={styles1.question}>
          <Text>1</Text>
          <Text> {state}</Text>
          <Text>10</Text>
        </View>
      </View>
      <ButtonContainer answer={null} navigation={navigation} />

    </View>
  )
};

export default ScaleQuestionScreen;

const styles = StyleSheet.create({
  question: {
    height: '90%',
    justifyContent: 'center',
    padding: 15,
  },
});
const styles1 = StyleSheet.create({
  question: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    paddingBottom: 40,
    fontSize: 20,
    alignSelf: 'center',
    color: '#fff',
  }
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});