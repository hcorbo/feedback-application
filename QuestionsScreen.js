import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CampaignContext } from './contexts/CampaignContext'
import SingleAnswerQuestionScreen from './questionScreens/SingleAnswerQuestionScreen'
import ScaleQuestionScreen from './questionScreens/ScaleQuestionScreen'
import TextQuestionScreen from './questionScreens/TextQuestionScreen'
import MultipleChoiceQuestionScreen from './questionScreens/MultipleChoiceQuestionScreen'



const QuestionsScreen = ({ navigation }) => {

  const [campaign, setCampaign] = useState(false);

  const { getQuestions, questions, currentQuestion, getNextQuestion, getPreviousQuestion } = useContext(CampaignContext);


  if (!campaign) {
    getQuestions();
    setCampaign(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {questions[currentQuestion].QuestionType == "Single" &&
          <SingleAnswerQuestionScreen question={questions[currentQuestion]} navigation={navigation} />
        }
        {questions[currentQuestion].QuestionType == "Scale" &&
          <ScaleQuestionScreen question={questions[currentQuestion]} navigation={navigation} />
        }
        {questions[currentQuestion].QuestionType == "Text" &&
          <TextQuestionScreen question={questions[currentQuestion]} navigation={navigation} />
        }
        {questions[currentQuestion].QuestionType == "Multiple" &&
          <MultipleChoiceQuestionScreen question={questions[currentQuestion]} navigation={navigation} />
        }
      </View>
    </View>
  );
};

export default QuestionsScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo
  }
});