import React from 'react';
import { Form, Input, Modal, Row, Col, Select } from 'antd';

import { TaskSchema } from './utils/validations';
import { useDispatch } from 'react-redux';
import { taskStatusValues } from './utils/constants';
import { createTask, updateTask } from './homeSlice';

const { Option } = Select;

const AddNewTaskModal = props => {
  const { visible, onClose, editMode, id, taskName, status, setShowTaskModal } = props;
  let initData = editMode === 'update' ? { id, taskName, status } : undefined;

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const submitForm = async values => {
    try {
      if (values) {
        if (editMode === 'create') {
          await dispatch(createTask(values));
        } else {
          await dispatch(updateTask(initData.id, values));
        }
        setShowTaskModal(false);
      }
    } catch {}
  };

  return (
    <div>
      <Modal
        title={editMode === 'create' ? 'Add New Task' : 'Update Task'}
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              submitForm(values);
            })
            .catch(info => {
              console.log('Validation Failed:', info);
            });
        }}
        onCancel={() => onClose()}
        okText={editMode === 'update' ? 'Update' : 'Create'}
        cancelText="Cancel"
        width={1000}>
        <div>
          {(editMode === 'create' || editMode === 'update') && (
            <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={initData}>
              <Row>
                <Col span={24}>
                  <Form.Item label="Task Name" name="taskName" rules={TaskSchema.taskName}>
                    <Input placeholder="Please input" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Status" name="status" rules={TaskSchema.status}>
                    <Select>
                      {taskStatusValues.length &&
                        taskStatusValues.map((item, i) => (
                          <Option key={i} value={item.value}>
                            {item.label}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddNewTaskModal;
