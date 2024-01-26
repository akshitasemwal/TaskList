"use client";

import TaskForm from "../components/TaskForm";
import { Button, Layout, List, Menu } from "antd";
import Link from "next/link";
import { supabase } from "../../../supabase/supabase.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import styles from "../styles/todoPage.module.css";

interface Task {
  id: number;
  taskname: string;
  taskStatus: string;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const handleSignOut = async () => {
    let { error } = await supabase.auth.signOut();
    router.push("/");
  };

  const getTasks = async () => {
    try {
      const { data, error } = await supabase.from("tasklist").select("*");

      if (error) throw error;

      if (data != null) {
        setTasks(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <Layout>
      <Header style={{}} className="styles.header">
        <Button
          htmlType="submit"
          onClick={handleSignOut}
          style={{
            color: "white",
            position: "absolute",
            right: "3em",
            top: "1em",
          }}
        >
          Sign out
        </Button>
      </Header>
      <Content className="">
        <h1 className="text-4xl p-5 text-center">My Todo List</h1>

        <TaskForm />
        <div className="p-7">
          {/* Display tasks */}
          <h1 className="text-3xl">Your Tasks</h1>
          <List
            itemLayout="horizontal"
            dataSource={tasks}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={item.taskname}
                  description={item.taskStatus}
                />
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  );
}
