import * as types from '../types';

const initialState = {
  loading: false,
  students: [],
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STUDENTS_REQUEST:
    case types.ADD_STUDENT_REQUEST:
    case types.UPDATE_STUDENT_REQUEST:
    case types.DELETE_STUDENT_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_STUDENTS_SUCCESS:
      return { ...state, loading: false, students: action.payload };

    case types.ADD_STUDENT_SUCCESS:
      return { ...state, loading: false, students: [...state.students, action.payload] };

    case types.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        students: state.students.map((s) =>
          String(s.id) === String(action.payload.id) ? action.payload : s
        ),
      };

    case types.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        students: state.students.filter((s) => String(s.id) !== String(action.payload)),
      };

    case types.FETCH_STUDENTS_FAIL:
    case types.ADD_STUDENT_FAIL:
    case types.UPDATE_STUDENT_FAIL:
    case types.DELETE_STUDENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default studentReducer;
