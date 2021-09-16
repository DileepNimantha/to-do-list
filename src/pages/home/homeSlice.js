import { createSlice } from '@reduxjs/toolkit';
import { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi, deleteTasksApi } from '../../api/toDo';
import { toast } from 'react-toastify';

// import { getUserApi } from '../../api/user';

let initialState = {
  tasks: [],
  loading: false,
  error: '',
  message: ''
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getTasksStart(state) {
      state.loading = true;
    },
    getTasksSuccess(state, action) {
      const { data } = action.payload;
      state.tasks = data;
      state.loading = false;
    },
    getTasksFail(state) {
      state.loading = false;
    },

    createTaskStart(state) {
      state.loading = true;
    },
    createTaskSuccess(state, action) {
      const { data, message } = action.payload;
      state.loading = false;
      state.message = message;
      state.tasks.push(data);
    },
    createTaskFail(state) {
      state.loading = false;
    },

    updateTaskStart(state) {
      state.loading = true;
    },
    updateTaskSuccess(state, action) {
      const { message } = action.payload;
      state.loading = false;
      state.message = message;
    },
    updateTaskFail(state) {
      state.loading = false;
    },

    deleteTaskStart(state) {
      state.loading = true;
    },
    deleteTaskSuccess(state, action) {
      const { message } = action.payload;
      state.loading = false;
      state.message = message;
    },
    deleteTaskFail(state) {
      state.loading = false;
    },

    deleteTasksStart(state) {
      state.loading = true;
    },
    deleteTasksSuccess(state, action) {
      const { message } = action.payload;
      state.loading = false;
      state.message = message;
    },
    deleteTasksFail(state) {
      state.loading = false;
    }
  }
});

export const {
  getTasksStart,
  getTasksSuccess,
  getTasksFail,

  createTaskStart,
  createTaskSuccess,
  createTaskFail,

  updateTaskStart,
  updateTaskSuccess,
  updateTaskFail,

  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFail,

  deleteTasksStart,
  deleteTasksSuccess,
  deleteTasksFail
} = homeSlice.actions;

export default homeSlice.reducer;

export const fetchTasks = () => async dispatch => {
  dispatch(getTasksStart());
  try {
    const tasks = await getTasksApi();
    dispatch(getTasksSuccess(tasks));
  } catch (error) {
    dispatch(getTasksFail());
  }
};

export const createTask = values => async dispatch => {
  dispatch(createTaskStart());
  try {
    const task = await createTaskApi(values);
    dispatch(createTaskSuccess(task));
    toast.success(task.message);
  } catch (error) {
    dispatch(createTaskFail());
  }
};

export const updateTask = (id, task) => async dispatch => {
  dispatch(updateTaskStart());

  try {
    const response = await updateTaskApi(id, task);
    dispatch(updateTaskSuccess(response));
    toast.success(response.message);

    await dispatch(fetchTasks());
  } catch (error) {
    dispatch(updateTaskFail(error));
  }
};

export const deleteTask = taskId => async dispatch => {
  dispatch(deleteTaskStart());

  try {
    const response = await deleteTaskApi(taskId);
    dispatch(deleteTaskSuccess(response));
    toast.info(response.message);

    await dispatch(fetchTasks());
  } catch (error) {
    dispatch(deleteTaskFail(error));
  }
};

export const deleteTasks = taskIds => async dispatch => {
  dispatch(deleteTaskStart());

  try {
    const response = await deleteTasksApi(taskIds);
    console.log('deleteTask', response);
    dispatch(deleteTasksSuccess(response));
    toast.info(response.message);

    await dispatch(fetchTasks());
  } catch (error) {
    dispatch(deleteTasksFail(error));
  }
};
