import React, {useContext, useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { GoalsContext, TaskQueueContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import TaskItem from '../TaskItem';
import CurrentTaskItem from '../CurrentTaskItem';



const TaskQueuePage = ({ navigation }) => {
    const {taskQueue, setTaskQueue} = useContext(TaskQueueContext)
    const { goals, setGoals } = useContext(GoalsContext)
    const [ freeTime, setFreeTime ] = useState(taskQueue.freeTime)

    const generateTasks = () => {
      action = {
        type: 'generate',
        freeTime: freeTime,
        goals: goals
      }
     setTaskQueue(action)
     AsyncStorage.setItem('VISION_APP::TASKQUEUE', JSON.stringify(taskQueue));
    }

    const clearTasks = () => {
      action = {
        type: 'clear'
      }
      setTaskQueue(action)
    }
   
    React.useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Text size={18} style={styles.delete} onPress={clearTasks}>Clear</Text>
        )
      })
    })
  
    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.freeTime}>Free Time: </Text>
          <TextInput style={styles.freeTimeInput}keyboardType='number-pad'  value={freeTime} placeholder={freeTime.toString()} onChangeText={value =>{setFreeTime(value)}} />
        </View>
        <Text style={styles.heading}>Current Task:</Text>
        <CurrentTaskItem/>
        <ScrollView style={styles.scrollView}> 
          {
          taskQueue.tasks.map((task, index) => {
            if(index > 0){
              return (
                <TouchableOpacity  key={index} title={task} style={styles.container} onPress={() => navigation.navigate('Tasks',  {
                  task: task
                })}>
                  <View style={styles.goalContainer}>
                    <TaskItem index={index + 1} task={task}/>
                  </View>
                </TouchableOpacity>
              );
            }
          
        })
      }
      </ScrollView>
      <TouchableOpacity style={styles.taskQueue} onPress={() => generateTasks()
        }>
        <Text style={styles.goalButton}>Generate Tasks</Text>
      </TouchableOpacity>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    timeContainer:{
      alignItems: 'center',
      marginTop: 16,
      marginTop:6
    },
    heading: {
      color: '#02C39A',
      fontSize: 20,
      fontWeight: '600',
      marginLeft: 16,
    },
    scrollView: {
      paddingBottom: 0,
    },
    goalContainer: {
      marginTop: 10,
      paddingLeft: 16,
      paddingRight: 16,
    },
    delete:{
      color:'white'
    },
    taskQueue: {
      borderColor: '#fff',
      backgroundColor: '#02C39A',
      marginHorizontal: 20,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      position:'absolute',
      bottom:40
    },
    goalButton: {
      color: '#fff',
      height: 50,
      flex: 1,
      textAlign: 'center',
      paddingTop:16
    },
    freeTime: {
      color: '#02C39A',
      fontSize: 20,
      fontWeight: '600',
    },
    freeTimeInput: {
      color: '#D3D3D3',
      fontSize: 20,
      fontWeight: '600',
    },
  });
  

export default TaskQueuePage