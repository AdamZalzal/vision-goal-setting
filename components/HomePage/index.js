import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GoalItem from '../GoalItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import { GoalsContext } from '../../App';


const HomePage = ({navigation}) => {
  const { goals, setGoals } = useContext(GoalsContext)

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons name="add" size={18} color='#fff' onPress={() => navigation.navigate('AddGoal', {
          goals: goals
        })}/>
      )
    })

  })

  const deleteGoal = (deleteIndex) => {
    action = {
      type: 'delete',
      index: deleteIndex,
    }
    setGoals(action);
  }

  return  (
    
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {
        goals.length == 0 &&
        <TouchableOpacity style={styles.createContainer} onPress={() => navigation.navigate('AddGoal', {
          goals: goals
        })}>
                <Text style={styles.goal}>Create a new goal!</Text>
         </TouchableOpacity>
      }
      {
        goals.map((goal, index) => {
          return (
            <TouchableOpacity  key={index} title={goal} style={styles.container} onPress={() => navigation.navigate('Goals',  {
              index: index,
            })}>
              <View style={styles.goalContainer}>
                <GoalItem index={index + 1} goal={goal} deleteGoal={() => deleteGoal(index)}/>
              </View>
            </TouchableOpacity>
          );
        })
      }
      </ScrollView>
      <TouchableOpacity style={styles.taskQueue} onPress={() => navigation.navigate('TaskQueue', {
        goals: goals
      })}>
      
        <Text style={styles.goalButton}>Start Work Session</Text>
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
  taskQueue: {
    borderColor: '#fff',
    backgroundColor: '#02C39A',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom:40

  },
  goalButton: {
      color: '#fff',
      height: 50,
      flex: 1,
      textAlign: 'center',
      paddingTop:16
  },
  createContainer: {
    borderColor: '#02C39A',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    minHeight: 50,
  },
  goal: {
    color: '#02C39A'
  }
});

export default HomePage