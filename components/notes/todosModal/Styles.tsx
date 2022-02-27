import { TextStyle, ViewStyle } from 'react-native';

export interface HomeStyles {
  container: ViewStyle;
}

export interface HeaderStyles {
    close: ViewStyle;
    header: TextStyle;
    title: TextStyle;
    taskCount: TextStyle;
}

export interface InputStyles {
    footer: ViewStyle;
    todoInput: ViewStyle;
    errorText: TextStyle;
    button: TextStyle;
}

export interface TodoStyles {
    container:ViewStyle;
    todo:TextStyle;
    deleteButton:ViewStyle;
}

export interface TodoListStyles {
    container: ViewStyle;
}
