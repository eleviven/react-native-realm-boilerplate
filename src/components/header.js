import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './button';
import NewTodo from './new-todo';

export default function Header() {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Todos</Text>
        <View style={styles.actions}>
          <Button title="+ Add" onPress={() => setVisible(true)} />
        </View>
      </View>
      <NewTodo visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '800',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalBody: {
    padding: 15,
    paddingBottom: 0,
  },
  modalFooter: {
    padding: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
  },
  row: {
    marginBottom: 15,
  },
});
