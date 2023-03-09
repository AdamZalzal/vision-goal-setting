import React, { useRef, useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { GoalsContext } from '../../App';


const AddTaskPage = ({route, navigation}) => {
  const { goals, setGoals } = useContext(GoalsContext)
  const [ title, setTitle ] = useState('')
  const [ time, setTime ] = useState(0)
  const [ description, setDescription ] = useState('')

  const saveTask = () =>{
    
    var taskObj = {
      name: title,
      description: description,
      time: time
    }
    var action = {
      type: 'AddTask',
      index: route.params.goalIndex,
      milestoneIndex: route.params.milestoneIndex,
      task: taskObj
    }
    setGoals(action)

    navigation.navigate('Milestones', {
      index: route.params.milestoneIndex,
      goalIndex: route.params.goalIndex,
    })
  }
  const onChanged  = (text) => {
      setTime(parseInt(text.replace(/[^0-9]/g, '')))
  }
  
  return (
    <View style={styles.container}>
       <View style={styles.formContainer}>
        <View >
          <Text style={styles.fieldTitle}>
            Title:
          </Text>
          <TextInput style={styles.textInput} onChangeText={(value) => setTitle(value)}/>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>
            Description:
          </Text>
          <TextInput  style={styles.textInput} onChangeText={(value) => setDescription(value)}/>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>
            Estimated Time in Minutes:
          </Text>
          <TextInput style={styles.textInput} onChangeText={(value) => onChanged(value)}/>
        </View>
      </View>
      <TouchableOpacity 
      style={styles.saveTask}
      onPress={() => saveTask()}
      
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
    formContainer: {
      flex:1,
      flexDirection:'column',
      paddingLeft: 12,
      paddingTop: 12,
      paddingRight: 12,
      color: '#019D7B'
    },
    save:{
      color: 'white',
      fontSize: 16
    },
    saveTask: {
      borderColor: '#fff',
      backgroundColor: '#53AFFF',
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
      color: '#53AFFF',
      fontSize: 20,
      fontWeight: '600',
    }
  });
  

export default AddTaskPage