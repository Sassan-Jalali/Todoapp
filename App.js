import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  const addTodoHandler = () => {
    if (editedTodo) {

      setTodoList(currentList => {
        return currentList.map(todo => {
          if (todo.key === editedTodo.key) {
            return { ...todo, value: todoItem };
          } else {
            return todo;
          }
        });
      });
      setEditedTodo(null);
    } else {

      setTodoList(currentList => [
        ...currentList,
        { key: Math.random().toString(), value: todoItem }
      ]);
    }
    setTodoItem('');
  };

  const removeTodoHandler = todoId => {
    const edited = todoList.find(todo => todo.key === todoId);
    setEditedTodo(edited);
    setTodoList(currentList => {
      return currentList.filter(todo => todo.key !== todoId);
    });
  };

  const editTodoHandler = todoId => {
    const edited = todoList.find(todo => todo.key === todoId);
    setEditedTodo(edited);
    setTodoItem(edited.value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a Task"
          style={styles.input}
          onChangeText={text => setTodoItem(text)}
          value={todoItem}
        />
        <Button title={editedTodo ? "Edit" : "Add"} onPress={addTodoHandler} />
      </View>
      <FlatList
        data={todoList}
        renderItem={todoData => (
          <View style={styles.listItem}>
            <Text>{todoData.item.value}</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => editTodoHandler(todoData.item.key)} />
              <Button title="Delete" onPress={() => removeTodoHandler(todoData.item.key)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: '80%',
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ccc',
    borderColor: 'blue',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
});