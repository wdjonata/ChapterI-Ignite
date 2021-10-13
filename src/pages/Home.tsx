import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskUpdate{
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    if (!newTaskTitle) {
      return
    }

    if (tasks.some(task => task.title === newTaskTitle)) {
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState,data])
  }

  function handleToggleTaskDone(id: number) {

    const updateTasks = tasks.map( task => ({ ...task }))

    const item = updateTasks.find(element => (element.id == id))
    
    if (!item) {
      return
    }

    item.done = !item.done

    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {

    Alert.alert("Remover item","Tem certeza que você deseja remover esse item?",
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => (setTasks(oldState => oldState.filter(task => task.id !== id)))
        }
        
      ]
    )

  }

  function handleEditTask(Task: TaskUpdate){

    const updateTasks = tasks.map( task => ({ ...task }))

    const item = updateTasks.find(element => (element.id == Task.taskId))
    
    if (!item) {
      return
    }

    item.title = Task.taskNewTitle

    setTasks(updateTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})