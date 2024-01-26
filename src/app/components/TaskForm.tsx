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
    //console.log(user);
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
    //console.log("success", values.taskname, values.taskstatus);
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
    <div className="flex justify-center items-center min-w-96">
      <div className="w-96 p-6 rounded-sm">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "600", textAlign: "center" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className=""
        >
          <Form.Item<FieldType>
            label="Task Name"
            name="taskname"
            rules={[{ required: true, message: "Have you entered the task?" }]}
          >
            <Input placeholder="Enter your task" className="block w-full p-2" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Task Status"
            name="taskstatus"
            rules={[{ required: true, message: "Is your task completed?" }]}
          >
            <Input
              placeholder="Enter the status of your task"
              className="block p-2"
            />
          </Form.Item>
          {/* dont forget htmlType */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              block
              htmlType="submit"
              className="text-white bg-blue-700 hover:bg-white text-center rounded-3xl"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
