import { ViewStyle, TextStyle } from 'react-native';

export interface GridStyles {
  container: ViewStyle;
  grid: ViewStyle;
  item: ViewStyle;
  itemDate: TextStyle;
}

export interface ListItemStyles {
  container: ViewStyle;
  textContainer: ViewStyle;
  textTitle: TextStyle;
  textBody: TextStyle;
  textDate: TextStyle;
}

export interface ListStyles {
    container: ViewStyle;
}

export interface ModalStyles {
    modalContainer: ViewStyle;
    errorText: TextStyle;
}

export interface MonthStyles {
    container: ViewStyle
    list: ViewStyle;
    listItem: TextStyle;
}
