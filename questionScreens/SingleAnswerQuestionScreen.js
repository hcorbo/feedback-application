import React, { useState, useContext } from 'react'

import { Text, View, Dimensions, StyleSheet, FlatList, Image, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import ButtonContainer from '../ButtonContainer';
import ModalDropdown from 'react-native-modal-dropdown'
import { CampaignContext } from '../contexts/CampaignContext'
import * as Animatable from 'react-native-animatable';

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

  const Item = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => { setAnswer(item.AnswerId); }} >
      <Image
        style={styles.image}
        source={{ uri: `data:image/gif;base64,${item.Answer.AnswerText}` }}
      />
    </TouchableWithoutFeedback>
  )

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (
    <View style={styles.container}>
      <View style={{alignItems: "center", alignContent: 'center', marginBottom: 20}}>
        <View style={styles.logo}>
          <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
        </View>
      </View>

      <Animatable.View style={styles.header}
        animation="bounceIn"
        duraton="1500"
      >
        <Text style={styles.questionText}>{question.QuestionText}</Text>
      
        {question.QuestionAnswers[0].Answer.IsApicture === true ? 
          <View style={styles.flatlist}>  
             <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.AnswerId}
                style={{flex: 1}}
                numColumns={2}
              />
            </View>
        : <ModalDropdown
           options={data}
           renderRowText={(options) => {return options.Answer.AnswerText}}
           renderButtonText={(options) => {return options.Answer.AnswerText}}
           style={styles.dropdown}
           textStyle={styles.text}
           defaultValue={'Izaberite..'}
           isFullWidth={true}
           dropdownTextStyle={styles.dropdownTextStyle}
           onSelect={(index, value) => { nextQuestion(value.AnswerId); }}
         />}
      </Animatable.View>
      
      <View style={styles.footer}>
      <ButtonContainer answer={{ "QuestionId": question.QuestionId, "AnswerId": answer, "CustomAnswer": null }} navigation={navigation}/>
      </View>
    </View>
  )
};

export default SingleAnswerQuestionScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.17;

const styles = StyleSheet.create({

  container: {
    margin: 20,
    width: '100%',
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
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
  footer: {
    marginTop: 50,
  },
  flatlist: {
    flexDirection: 'row',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  dropdownTextStyle: {
    color: '#000000',
    fontSize: 15,
  },
  image: {
    margin: 5,
    height: 100,
    width: 100,
  },
  questionText: {
    paddingBottom: 30, 
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  }
});
