"use client";
import { Button, Checkbox, Form, Input } from "antd";
import { supabase } from "../../../supabase/supabase";

export default function TaskForm() {
  const getUser = async () => {
    // try {
    //   const userAuth = await supabase.auth.getUser();
    //   if (userAuth && userAuth.data) {
    //     const userID = userAuth.data.user.id;
    //     return userID;
    //   }
    // } catch (error) {
    //   console.error("Error fetching user:", error);
    // }
    // return null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    return user;
  };

  type FieldType = {
    user_id?: number;
    //id?: number;
    taskname?: string;
    taskstatus?: string;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: any) => {
    console.log("success", values.taskname, values.taskstatus);
    const userID = await getUser();
    addTask(values, userID);
  };

  const addTask = async (values: any, userID: any) => {
    try {
      const { data, error } = await supabase
        .from("tasklist")
        .insert({
          user_id: userID.id,
          //id: values.id,
          taskname: values.taskname,
          taskStatus: values.taskstatus,
        })
        .single();
      if (error) throw error;
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="TaskName"
        name="taskname"
        rules={[{ required: true, message: "Type your task here..." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="TaskStatus"
        name="taskstatus"
        rules={[{ required: true, message: "Is your task completed?" }]}
      >
        <Input />
      </Form.Item>
      {/* dont forget htmlType */}
      <Button htmlType="submit">Add</Button>
    </Form>
  );
}
