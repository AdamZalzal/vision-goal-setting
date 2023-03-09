import React, { useRef, useReducer, useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import MilestoneItem from '../MilestoneItem';
import { GoalsContext } from '../../App';


function milestoneReducer(state, milestone){
  return [...state, milestone]
}

const AddGoalPage = ({route, navigation}) => {
  const [milestones, setMilestones] = useReducer(milestoneReducer, []);
  const { setGoals } = useContext(GoalsContext)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

  const saveGoal = () =>{
    
    var goalObj = {
      name: title,
      description: description,
      milestones: milestones,
      completedMilestones: []
    }
    var action = {
      type: 'add',
      goal: goalObj
    }

    setGoals(action)
    navigation.navigate('Home')
  }


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View >
          <Text style={styles.fieldTitle}>
            Title:
          </Text>
          <TextInput style={styles.textInput} placeholder={'Enter Title...'} onChangeText={(value) => setTitle(value)}/>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>
            Description:
          </Text>
          <TextInput  style={styles.textInput} placeholder={'Enter Description...'} onChangeText={(value) => setDescription(value)}/>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {
          milestones.map((milestone, index) => {
            return (
              <TouchableOpacity  key={index} title={milestone} style={styles.container}>
                <View style={styles.goalContainer}>
                  <MilestoneItem index={index + 1} milestone={milestone}/>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
      <TouchableOpacity 
        style={styles.saveGoal}
        onPress={() => saveGoal()}
        >
          <Text style={styles.goalButton}>Save</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollView: {
      marginBottom: 70,
    },
    goalContainer: {
      marginTop: 10,
      paddingLeft: 16,
      paddingRight: 16
    },
    formContainer: {
      flex:1,
      flexDirection:'column',
      paddingLeft: 12,
      paddingTop: 12,
      paddingRight: 12,
      color: '#019D7B'
    },
    save: {
      color: 'white',
      fontSize: 16,
    },
    saveGoal: {
      borderColor: '#fff',
      backgroundColor: '#02C39A',
      borderWidth: 1,
      marginHorizontal: 20,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      position: 'absolute',
      bottom: 40 ,
    },
    goalButton: {
      color: '#fff',
      height: 50,
      flex: 1,
      textAlign: 'center',
      paddingTop:16
    },
    fieldContainer:{
      marginTop: 12,
      alignContent: 'center'
    },
    textInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#D3D3D3',
      width: '75%',
      marginTop:4,
      color: '#5A5A5A'
    },
    fieldTitle: {
      color: '#02C39A',
      fontSize: 20,
      fontWeight: '600',
    }
  });
  

export default AddGoalPage