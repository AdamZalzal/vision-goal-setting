import React, {useContext, useEffect, useState} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { GoalsContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../TaskItem';
import CompletedExpandable from '../CompletedExpandable';
import { MaterialIcons } from '@expo/vector-icons';

const MilestonePage = ({route, navigation}) => {
    const { goals, setGoals } = useContext(GoalsContext)
    const [ milestone, setMilestone ] = useState(goals[route.params.goalIndex].milestones[route.params.index])
    const [ tasks, setTasks ] = useState( milestone.tasks);
    const [ isCollapsed, setIsCollapsed ] = useState(true)
    const [ editMode, setEditMode ] = useState(false)
  
    useEffect(() => {
      setMilestone(goals[route.params.goalIndex].milestones[route.params.index])
      setTasks(milestone.tasks)
    }, [goals])

    const deleteTask = (task, taskIndex) =>{
      action = {
        type: 'DeleteTask',
        index: route.params.goalIndex,
        milestoneIndex: route.params.index,
        taskIndex: taskIndex,
        task: task
      } 
      setGoals(action)
      AsyncStorage.setItem('VISION_APP::GOALS', JSON.stringify(goals));
    }

    const deleteMilestone = () =>{
      action = {
        type: 'DeleteMilestone',
        index: route.params.goalIndex,
        milestoneIndex: route.params.index
      }

      setGoals(action)
      AsyncStorage.setItem('VISION_APP::GOALS', JSON.stringify(goals));
      navigation.navigate('Goals',{
        index: route.params.goalIndex
      })
    }

    React.useEffect(() => {
      navigation.setOptions({
        headerRight: () => {
          if (editMode) {
            return (<Text size={18} style={styles.delete} onPress={() => setEditMode(false)}>Done</Text>)
          } else {
            return (<Text size={18} style={styles.delete} onPress={() => setEditMode(true)}>Edit</Text>)
          }
        }
      })
      navigation.setOptions({
        headerLeft: () => (
          <MaterialIcons style={styles.delete} name="arrow-back-ios" size={24} color='#fff' onPress={()=>{
            navigation.navigate('Goals',{
              index: route.params.goalIndex
            })
          }} />
          )
      })
    },[editMode])

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{milestone.name}</Text>
        <Text style={styles.description}>{milestone.description}</Text>
          <ScrollView style={styles.scrollView}>
          {
            tasks.map((task, index) => {
              return (
                <TouchableOpacity  key={index} title={task} style={styles.container} onPress={() => navigation.navigate('Tasks',  {
                  goalIndex: route.params.goalIndex,
                  milestoneIndex: route.params.index,
                  index: index
                })}>
                  <View style={styles.goalContainer}>
                    <TaskItem index={index + 1} task={task} editMode={editMode} deleteTask={deleteTask} taskIndex={index}/>
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
        <View>
          <CompletedExpandable expanded={isCollapsed} items={milestone.completedTasks} isTask={true} type={'Tasks'}/>
        </View>
        <TouchableOpacity onPress={()=>{
            setIsCollapsed(!isCollapsed)
          }}
          style={styles.showCompletedContainer}>
            {
              isCollapsed && <MaterialIcons  name="add" size={18} color='#A9A9A9' />
            }
            {
              !isCollapsed && <MaterialIcons  name="remove" size={18} color='#A9A9A9' />
            }
          <Text style={styles.showCompleted}>
              Show Completed Tasks
          </Text>
        </TouchableOpacity>
        {
          !editMode && <TouchableOpacity 
          style={styles.addTask}
          onPress={() => navigation.navigate('AddTask', {
            goalIndex: route.params.goalIndex,
            milestoneIndex: route.params.index
          })}
          
        >
          <Text style={styles.goalButton}>Add a task for your Milestone!</Text>
        </TouchableOpacity>
        }
        { editMode &&
        <TouchableOpacity 
          style={styles.deleteMilestone}
          onPress={() => deleteMilestone()}
          
        >
          <Text style={styles.goalButton}>Delete</Text>
        </TouchableOpacity>
        } 
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    heading: {
      color: '#5E7CE2',
      fontSize: 20,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 5,
      marginLeft: 16,

    },
    showCompleted: {
      color: '#A9A9A9',
      fontSize: 14,
      marginLeft: 4,
      fontWeight: '500'
    },
    scrollView: {
      marginBottom: 0,
    },
    goalContainer: {
      marginTop: 10,
      paddingLeft: 16,
      paddingRight: 16
    },
    description: {
      paddingLeft: 18,
      color: '#808080'
    },
    delete:{
      color:'white'
    },
    addTask: {
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
    deleteMilestone: {
      borderColor: '#fff',
      backgroundColor: '#D11A2A',
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
    showCompletedContainer: {
      marginHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingBottom:2,
      position: 'absolute',
      bottom: 94 ,
    },
    goalButton: {
        color: '#fff',
        height: 50,
        flex: 1,
        textAlign: 'center',
        paddingTop:16
    },
  });
  

export default MilestonePage