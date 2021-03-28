import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Button from '../components/button';
import Header from '../components/header';
import {
  getTodos,
  deleteTodo,
  subTodos,
} from '../database/controllers/todo.controller';

export default function HomeScreen() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const todos = await getTodos();
    setData(todos);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const listener = subTodos(todos => {
      loadData();
    });
    return () => {
      listener.remove();
    };
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.paragraph}>{item.description}</Text>
      </View>
      <View style={styles.footer}>
        <View style={{flex: 1}}>
          <Button title="Update" />
        </View>
        <View style={{flex: 1}}>
          <Button
            title="Remove"
            textColor="red"
            onPress={() => deleteTodo(item.id)}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#eee',
  },
  contentContainerStyle: {
    padding: 15,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    marginBottom: 15,
  },
  body: {
    padding: 20,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
  },
});
