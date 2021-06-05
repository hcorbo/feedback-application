import React, { useState, useContext } from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import ButtonContainer from '../ButtonContainer';
import { CampaignContext } from '../contexts/CampaignContext'
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from "expo-linear-gradient";

const SingleAnswerQuestionScreen = ({ question, navigation }) => {
  const [answer, setAnswer] = useState({});
  const [previousValue,setPreviousValue] = useState(false);
  var data = question.QuestionAnswers;

  const { addAnswer, getNextQuestion, userResponses} = useContext(CampaignContext);

  const nextQuestion = (answerId) => {
    addAnswer({ "QuestionId": question.QuestionId, "AnswerId": answerId, "CustomAnswer": null });
    if (getNextQuestion()) navigation.navigate('EndScreen');
    else getNextQuestion();
  };

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
                data.map((answer) => (
                    <TouchableOpacity
                        key={answer.AnswerId}
                        style={answer.Answer.IsAPicture ? [styles.button, {height: 90. / data.length + '%'}] : [styles.button, {height: 60. / data.length + '%'}]}
                        onPress={() => nextQuestion(answer.AnswerId)}
                    >
                      {!answer.Answer.IsAPicture &&
                      <LinearGradient
                          colors={['#ededed', '#d3d3d3']}
                          style={[styles.gradient_button]}>
                        <Text style={styles.text_answer}>{answer.Answer.AnswerText}</Text>
                      </LinearGradient>}
                      {answer.Answer.IsAPicture &&
                      <Image
                          style={[styles.button_image]}
                          resizeMode="stretch"
                          source={{ uri: "data:image/png;base64," + answer.Answer.Base64 }}>
                      </Image>}
                    </TouchableOpacity>
                ))
              }
            </View>
          </View>
        </Animatable.View>
        <ButtonContainer answer={{ "QuestionId": question.QuestionId, "AnswerId": answer, "CustomAnswer": null }} navigation={navigation}/>

    </View>
  )
};

export default SingleAnswerQuestionScreen;

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
  button: {
    alignSelf: 'center',
    width: '100%',
    padding: 2
  },
  gradient_button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 2
  },
  button_image: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
});

