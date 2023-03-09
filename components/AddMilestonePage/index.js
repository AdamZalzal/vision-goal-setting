import React, { useRef, useState, useReducer, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { GoalsContext } from '../../App';
import TaskItem from '../TaskItem';

function taskReducer(state, task){
  return [...state, task]
}

const AddMilestonePage = ({route, navigation}) => {
  const [tasks, setTasks] = useReducer(taskReducer, []);
  const { goals, setGoals } = useContext(GoalsContext)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

  const saveMilestone = () =>{
    
    var milestoneObj = {
      name: title,
      description: description,
      tasks: tasks,
      completedTasks: []
    }
    var action = {
      type: 'AddMilestone',
      index: route.params.goalIndex,
      milestone: milestoneObj
    }

    setGoals(action)

    navigation.navigate('Goals', {
      index: route.params.goalIndex,
      goal: goals[route.params.goalIndex]
    })
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
            tasks.map((task, index) => {
              return (
                <TouchableOpacity  key={index} title={task} style={styles.container} onPress={() => navigation.navigate('Goals',  {
                  milestone: milestone
                })}>
                  <View style={styles.goalContainer}>
                    <TaskItem index={index + 1} task={task}/>
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
        <TouchableOpacity 
        style={styles.saveMilestone}
        onPress={() => saveMilestone()}
        
        >
        <Text style={styles.saveButton}>Save</Text>
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
      fontSize: 16
    },
    saveMilestone: {
      borderColor: '#fff',
      backgroundColor: '#5E7CE2',
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
    saveButton: {
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
      color: '#5E7CE2',
      fontSize: 20,
      fontWeight: '600',
    }
  });
  

export default AddMilestonePage