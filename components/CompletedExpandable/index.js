import React, { useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import CompletedItem from '../CompletedItem';


const CompletedExpandable = ({ expanded = false, items = [], isTask = false, type='' }) => {
    const [height] = useState(new Animated.Value(0));
  
    useEffect(() => {
      Animated.timing(height, {
        toValue: !expanded ? 250 : 0,
        duration: 150,
        useNativeDriver: false
      }).start();
    }, [expanded, height]);
  
    return (
      <Animated.View
        style={{ height: height}}
      >
        <Text style={styles.showCompleted}>
            Completed {type}:
        </Text>
        <ScrollView style={styles.scrollView}>
        {
          items.map((item, index) => {
            return (
              <TouchableOpacity  key={index} title={item} style={styles.container} >
                <View style={styles.goalContainer}>
                  <CompletedItem index={index + 1} item={item} isTask={isTask}/>
                </View>
              </TouchableOpacity>
            );
          })
        }
        </ScrollView>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollView: {
      marginBottom: 70,
    },
    showCompleted: {
        color: '#A9A9A9',
        fontSize: 14,
        marginLeft: 4,
        fontWeight: '500',
        paddingLeft:16
      },
    goalContainer: {
      marginTop: 10,
      paddingLeft: 16,
      paddingRight: 16
    }})

  export default CompletedExpandable