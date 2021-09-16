import { Table, Button, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddNewTaskModal from './AddNewTaskModal';
import { deleteTask, deleteTasks, fetchTasks } from './homeSlice';
import { taskStatusValues } from './utils/constants';

const ToDoContent = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(state => state.home);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editMode, setEditMode] = useState('');
  const [selectedTask, setSelectedTask] = useState();

  useEffect(() => {
    const getTasks = () => {
      dispatch(fetchTasks());
    };
    getTasks();
  }, [dispatch]);

  const addTask = () => {
    setEditMode('create');
    setShowTaskModal(true);
  };

  const editTask = task => {
    setSelectedTask(task);
    setEditMode('update');
    setShowTaskModal(true);
  };

  const onDelete = async task => {
    try {
      if (task) {
        await dispatch(deleteTask(task.id));
      }
    } catch {}
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id'
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => {
        const task = taskStatusValues.find(x => x.value === status);
        return <Tag color={task ? task.color : 'cyan'}>{task ? task.label : status}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editTask(record)}>
            Edit
          </Button>
          <Button danger onClick={() => onDelete(record)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  const deleteSeletedTasks = async () => {
    await dispatch(deleteTasks(selectedRowKeys));
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    }
  };

  return (
    <div>
      <h2>To Do List</h2>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={addTask}>
          Add Task
        </Button>

        <Button danger onClick={deleteSeletedTasks} disabled={!(selectedRowKeys.length > 0)}>
          Delete
        </Button>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </Space>

      <Table rowSelection={rowSelection} columns={columns} dataSource={tasks} rowKey="id" loading={loading} />

      {showTaskModal && (
        <AddNewTaskModal
          onClose={() => {
            setEditMode('');
            setShowTaskModal(false);
          }}
          visible={showTaskModal}
          editMode={editMode}
          {...selectedTask}
          setShowTaskModal={setShowTaskModal}
        />
      )}
    </div>
  );
};

export default ToDoContent;
