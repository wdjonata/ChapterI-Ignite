import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import penEdit from '../assets/icons/Pen_Edit.png'
import xIcon from '../assets/icons/X.png'


interface TaskItem {
    id: number;
    title: string;
    done: boolean;
}

interface TaskEdit {
    taskId: number,
    taskNewTitle: string
  }

interface TaskItemProps {
    task : TaskItem
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    index : number;
    editTask : (Task: TaskEdit) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, index, editTask }: TaskItemProps){

    const [editing, setEditing] = useState(false)
    const [titleEdit, setTitleEdit] = useState(task.title)

    const textInputRef = useRef<TextInput>(null)

    const handleStartEditing = () => {
        setEditing(true)
    }

    const handleCancelEditing = () => {
        setTitleEdit(task.title)
        setEditing(false)
    }

    const handleSubmitEditing = () => {

        const data = {
            taskId: task.id,
            taskNewTitle: titleEdit
        }

        editTask(data)

        setEditing(false)
    }

    const handleRemoveTask = () => {
        removeTask(task.id)
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (editing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
    }, [editing])

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                  testID={`button-${index}`}
                  activeOpacity={0.7}
                  style={styles.taskButton}
                  onPress={() => toggleTaskDone(task.id)}
                >
                <View 
                    testID={`marker-${index}`}
                    style={task.done
                      ? styles.taskMarkerDone
                      : styles.taskMarker
                    }
                >
                { task.done && (
                    <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                    />
                )}
                </View>
                
                <TextInput 
                    style={task.done 
                      ? styles.taskTextDone
                      : styles.taskText
                    }
                    value={titleEdit}
                    onChangeText={setTitleEdit}
                    editable={editing}
                    onSubmitEditing={handleSubmitEditing}
                    ref={textInputRef}
                >
                </TextInput>
                </TouchableOpacity>
            </View>
            <View style={styles.taskAreaIcon}>
                {editing
                 
                    ?(
                        <TouchableOpacity
                            testID={`trash-${index}`}
                            style={{ paddingHorizontal: 10 }}
                            onPress={handleCancelEditing}
                        >
                            <Image source={xIcon} />
                        </TouchableOpacity>
                    )
                    :(  <TouchableOpacity
                            testID={`trash-${index}`}
                            style={{ paddingHorizontal: 10 }}
                            onPress={handleStartEditing}
                        >
                            <Image source={penEdit} />
                        </TouchableOpacity>        
                    )
                }

                <View style={styles.iconsDivider}/>

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 10, 
                        opacity: editing ? 0.2 : 1
                    }}
                    onPress={handleRemoveTask}
                    disabled={editing}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
    
}
const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    taskAreaIcon: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    infoContainer: {
        flex: 1
    }

})