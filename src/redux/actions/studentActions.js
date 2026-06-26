import * as types from '../types';

const API_URL = 'http://localhost:5000/students';

// Fetch all students
export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENTS_REQUEST });
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch students');
    const data = await res.json();
    dispatch({ type: types.FETCH_STUDENTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: types.FETCH_STUDENTS_FAIL,
      payload: err.message || 'Could not load students. Is json-server running on port 5000?',
    });
  }
};

// Add a new student
export const addStudent = (student) => async (dispatch) => {
  dispatch({ type: types.ADD_STUDENT_REQUEST });
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!res.ok) throw new Error('Failed to add student');
    const data = await res.json();
    dispatch({ type: types.ADD_STUDENT_SUCCESS, payload: data });
    return data;
  } catch (err) {
    dispatch({ type: types.ADD_STUDENT_FAIL, payload: err.message });
    throw err;
  }
};

// Update an existing student, identified by its unique id
export const updateStudent = (id, updates) => async (dispatch) => {
  dispatch({ type: types.UPDATE_STUDENT_REQUEST });
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update student');
    const data = await res.json();
    dispatch({ type: types.UPDATE_STUDENT_SUCCESS, payload: data });
    return data;
  } catch (err) {
    dispatch({ type: types.UPDATE_STUDENT_FAIL, payload: err.message });
    throw err;
  }
};

// Delete a student by id
export const deleteStudent = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_STUDENT_REQUEST });
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete student');
    dispatch({ type: types.DELETE_STUDENT_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: types.DELETE_STUDENT_FAIL, payload: err.message });
    throw err;
  }
};
