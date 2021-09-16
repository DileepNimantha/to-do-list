export const TaskSchema = {
  taskName: [{ required: true, message: 'Task name is required' }],
  status: [{ required: true, message: 'Task status is required' }]
};
