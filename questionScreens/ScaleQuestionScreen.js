import React, { useState } from 'react'
import { Text, View } from 'react-native';

const ScaleQuestionScreen = (question) => {
  return (
    <View>
      <Text>This is a scale question</Text>
      <Text>{question.question.QuestionText}</Text>
    </View>
  )
};

export default ScaleQuestionScreen;