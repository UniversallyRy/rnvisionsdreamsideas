import { TextStyle, ViewStyle } from 'react-native';

export interface HomeStyles {
    container: ViewStyle;
    lists: ViewStyle;
}

export interface ListStyles {
  listContainer: ViewStyle;
  listModal: ViewStyle;
  listTitle: TextStyle;
  count: TextStyle;
  subtitle: TextStyle;
  deleteButton: ViewStyle;
}

export interface IdeaListStyles {
    listContainer: ViewStyle;
    listTitle: TextStyle;
    listContent: TextStyle;
    listCount: TextStyle;
    listText: TextStyle;
  }

export interface NewTodoStyles {
    container: ViewStyle;
    close: ViewStyle;
    form: ViewStyle;
    title: TextStyle;
    input: TextStyle;
    errorText: TextStyle;
    colorContainer: ViewStyle;
    colorSelect: ViewStyle;
}

export interface NewIdeaStyles {
    container: ViewStyle;
    close: ViewStyle;
    form: ViewStyle;
    title: TextStyle;
    input: TextStyle;
    errorText: TextStyle;
    colorSelect: ViewStyle;
}
