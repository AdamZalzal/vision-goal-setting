import React, {useContext, useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MilestoneItem from '../MilestoneItem';
import { GoalsContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompletedExpandable from '../CompletedExpandable';
import { MaterialIcons } from '@expo/vector-icons';

const GoalPage = ({route, navigation}) => {
    const { goals, setGoals } = useContext(GoalsContext)
    const [milestones, setMilestones] = useState(goals[route.params.index].milestones);
    const [ isCollapsed, setIsCollapsed ] = useState(true)
    const [ goal, setGoal ] = useState(goals[route.params.index])
    const [ editMode, setEditMode ] = useState(false)

    useEffect(() => {
      setMilestones(goals[route.params.index].milestones)
    }, [goals])

    const deleteGoal = () =>{
      action = {
        type: 'delete',
        index: route.params.index
      }
      setGoals(action)
      AsyncStorage.setItem('VISION_APP::GOALS', JSON.stringify(goals));
      navigation.navigate('Home')
    }

    const deleteMilestone = (milestoneIndex) =>{
      action = {
        type: 'DeleteMilestone',
        index: route.params.index,
        milestoneIndex: milestoneIndex
      }
      setGoals(action)
      AsyncStorage.setItem('VISION_APP::GOALS', JSON.stringify(goals));
    }

    React.useEffect(() => {
      navigation.setOptions({
        headerRight: () => {
          if (editMode) {
            return (<Text size={18} style={styles.edit} onPress={() => setEditMode(false)}>Done</Text>)
          } else {
            return (<Text size={18} style={styles.edit} onPress={() => setEditMode(true)}>Edit</Text>)
          }
        }
      }, [editMode])
      navigation.setOptions({
        headerLeft: () => (
          <MaterialIcons style={styles.edit} name="arrow-back-ios" size={24} color='#fff' onPress={()=>{
            navigation.navigate('Home')
          }} />
          )
      })
    })

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{goal.name}</Text>
        <Text style={styles.description}>{goal.description}</Text>
          <ScrollView style={styles.scrollView}>
            {
              milestones.map((milestone, index) => {
                return (
                  <TouchableOpacity  key={index} title={milestone} style={styles.container} onPress={() =>navigation.navigate('Milestones',  {
                    index: index,
                    goalIndex: route.params.index,
                  })}>
                    <View style={styles.goalContainer}>
                      <MilestoneItem index={index + 1} milestone={milestone} editMode={editMode} deleteMilestone={deleteMilestone} milestoneIndex={index}/>
                    </View>
                  </TouchableOpacity>
                );
              })
            }
        </ScrollView>
        <View>
          <CompletedExpandable expanded={isCollapsed} items={goal.completedMilestones} isTask={false} type={'Milestones'}/>
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
              Show Completed Milestones
          </Text>
        </TouchableOpacity>
        {
          !editMode &&  <TouchableOpacity 
          style={styles.addMilestone}
          onPress={() => navigation.navigate('AddMilestone', {
            goalIndex: route.params.index
          })}
          >
            <Text style={styles.goalButton}>Add a new milestone for this goal!</Text>
          </TouchableOpacity>
        }
        {
          editMode &&  <TouchableOpacity 
          style={styles.deleteGoal}
          onPress={() => deleteGoal()}
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
    color: '#02C39A',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 5,
    marginLeft: 16,
  },
  scrollView: {
    marginBottom: 70,
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
    color:'red'
  },
  edit:{
    color:'white'
  },
  addMilestone: {
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
  deleteGoal: {
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
  showCompleted: {
    color: '#A9A9A9',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500'
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
  
export default GoalPage