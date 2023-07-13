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
import { getImageCourseFromBD, uploadFileToCourse } from '../../services/CourseServices';

import SesionList from '../../../SesionsConfig/pages/SesionList';


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

  const uploadFileInCourse = async(doc) => {
    const courseDocName = currentOpenedCourse.title;
    uploadFileToCourse(courseDocName, doc);
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
        <Form.Item label="Title of course">
          <Input value={currentOpenedCourse.title}/>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload 
            onChange={uploadFileInCourse}
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
        <SesionList />
        {/* <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default CourseFormModal;