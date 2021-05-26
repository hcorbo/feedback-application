import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import ButtonContainer from '../ButtonContainer';
import Slider from '@react-native-community/slider';
import { CampaignContext } from '../contexts/CampaignContext'

const ScaleQuestionScreen = ({ question,navigation }) => {
  const [state, setState] = useState(0)

  return (
    <View>
      <View style={styles.question}>
        <Text style={styles1.text}>{question.QuestionText}</Text>
        <Slider
          style={{ width: 300, height: 40, alignSelf: 'center', }}
          minimumValue={1}
          maximumValue={10}
          thumbTintColor="#f0eff3"
          onValueChange={(value) => setState(value.toFixed(0))}
          value={state}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <View style={styles1.question}>
          <Text>1</Text>
          <Text> {state}</Text>
          <Text>10</Text>
        </View>
      </View>
      <ButtonContainer answer={{ "QuestionId": question.QuestionId, "AnswerId": -1, "CustomAnswer": state }} navigation={navigation}/>
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
  }
});