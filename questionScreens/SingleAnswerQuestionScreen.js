import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import ButtonContainer from '../ButtonContainer';
import ModalDropdown from 'react-native-modal-dropdown'
import { CampaignContext } from '../contexts/CampaignContext'

const SingleAnswerQuestionScreen = ({ question,navigation }) => {
  const [answer, setAnswer] = useState({});
  var data = question.QuestionAnswers 

  const Item = ({item}) =>  (
      <TouchableWithoutFeedback onPress={() => setAnswer(item.AnswerId)} >
        <Image
          style={styles.image}
          source={{uri: `data:image/gif;base64,${item.Answer.AnswerText}`}}         
        /> 
      </TouchableWithoutFeedback>
  )

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (
    <View>
      <View style={styles.question}>
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
           onSelect={(index,value) => {setAnswer(value.AnswerId);}}
         />}
      </View>
      
      <ButtonContainer answer={{ "QuestionId": question.QuestionId, "AnswerId": answer, "CustomAnswer": null }} navigation={navigation}/>
    </View>
  )
};

export default SingleAnswerQuestionScreen;

const styles = StyleSheet.create({
  question: {
    height: '90%',
    justifyContent: 'center',
  },
  flatlist: {
    flexDirection: 'row',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    maxWidth: 300
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  dropdownTextStyle: {
    color: '#000000',
    fontSize: 15
  },
  image: {
    margin: 5,
    height: 100,
    width: 100,
  },
  questionText: {
    paddingBottom: 40,
    fontSize: 20,
    alignSelf: 'center',
  }
});
