import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Modal
} from 'antd';
import { useEffect } from 'react';
import { getImageCourseFromBD } from '../../services/CourseServices';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CourseFormModal = ({
  isModalOpen,
  setIsModalOpen,
  currentOpenedCourse, 
  setCurrentOpenedCourse
}) => {

  const [images, setImages] = useState([]);

  useEffect( () => {
    getAllFiles();
  }, []);
  
  const getAllFiles = async() => {
    const files = await getImageCourseFromBD(currentOpenedCourse.title);
    setImages(files);
  };

  const onFormLayoutChange = ({ disabled }) => {
    // setComponentDisabled(disabled);
  };

  const handleOk = () => {
    setCurrentOpenedCourse({});
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal 
      open={isModalOpen}
      title="Course form"
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Cerrar"
      okText="Guardar"
    >
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
      >
        {/* <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label="Title of course">
          <Input value={currentOpenedCourse.title}/>
        </Form.Item>
        {/* <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item> */}
        {/* <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item> */}
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload 
            listType="picture-card"
            fileList={images}
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseFormModal;