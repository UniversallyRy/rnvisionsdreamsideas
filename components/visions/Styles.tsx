import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface GridStyles {
  grid: ViewStyle;
  gridItem: ViewStyle;
  img: ImageStyle;
}

export interface ImageStyles {
    container: ViewStyle;
    img: ImageStyle;
}
  
export interface ListStyles {
    container: ViewStyle;
    imgList: ViewStyle;
    bgImg: ImageStyle;
    thumbImg: ImageStyle;
}
  
export interface ModalStyles {
    container: ViewStyle;
    close: ViewStyle;
    textinput: TextStyle;
    errorText: TextStyle;
    footer: ViewStyle;
    button: ViewStyle;
}

export interface ThumbStyles {
    thumbImg: ImageStyle;
}