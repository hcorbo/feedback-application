import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import ButtonContainer from '../ButtonContainer';
import Slider from '@react-native-community/slider';
import { CampaignContext } from '../contexts/CampaignContext'

const ScaleQuestionScreen = ({ question }) => {
  const [answer, setAnswer] = useState(0);

  return (
    <View>
      <View style={styles.question}>
        <Text style={styles1.text}>{question.QuestionText}</Text>
        <Slider
          style={{ width: 300, height: 40, alignSelf: 'center', }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={(value) => setAnswer(value)}
          value={answer}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <View style={styles1.question}>
          <Text>0</Text>
          <Text> {answer.toFixed(2)}</Text>
          <Text>1</Text>
        </View>
      </View>
      <ButtonContainer answer={answer} />
    </View>
  )
};

export default ScaleQuestionScreen;

const styles = StyleSheet.create({
  question: {
    height: '90%',
    justifyContent: 'center'
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
  }
});