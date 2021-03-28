import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from './button';
import Input from './input';
import {createTodo} from '../database/controllers/todo.controller';

export default function NewTodo({visible, onClose}) {
  const [state, setState] = useState({
    title: '',
    description: '',
  });

  const handleCreate = async () => {
    await createTodo({
      id: Math.round(Math.random() * 9999),
      ...state,
    });
    setState({title: '', description: ''});
    onClose();
  };

  const handleChange = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setState({title: '', description: ''});
  }, [visible]);
  return (
    <Modal transparent={true} visible={visible}>
      <KeyboardAvoidingView behavior="padding" style={styles.modal}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.modalBody}>
              <View style={styles.row}>
                <Input
                  placeholder="Title"
                  value={state.title}
                  onChangeText={text => handleChange('title', text)}
                />
              </View>
              <View style={styles.row}>
                <Input
                  placeholder="Açıqlama"
                  value={state.description}
                  onChangeText={text => handleChange('description', text)}
                />
              </View>
            </View>
            <View style={styles.modalFooter}>
              <View style={{flex: 1}}>
                <Button title="Create" onPress={handleCreate} />
              </View>
              <View style={{flex: 1}}>
                <Button title="Cancel" textColor="red" onPress={onClose} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
