import { ADD_VISION, EDIT_VISION, DELETE_VISION } from "../actionTypes";
import uuid from "../../utils/uuid";

const initialVisions = Array.from({ length: 8 }).map((_, i) => {
  return {
    uri: `https://picsum.photos/200${i}`,
    title: `This is the title ${i + 1}!`,
    id: uuid.generate(),
  };
});

export default function (state = initialVisions, action) {
  switch (action.type) {
    case ADD_VISION:
      // state=initialVisions;
      // return state
      return [
        {
          uri: action.payload.uri,
          title: action.payload.title,
          id: uuid.generate(),
        },
        ...state,
      ];
    case EDIT_VISION: {
      return {
        ...state,
      };
    }
    case DELETE_VISION: {
      return state.filter((vision) => vision.id !== action.payload.id);
    }
    default:
      return state;
  }
}
