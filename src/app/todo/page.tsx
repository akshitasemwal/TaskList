"use client";

import TaskForm from "../components/TaskForm";
import { Button } from "antd";
import Link from "next/link";
import { supabase } from "../../../supabase/supabase.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div>
      <div>
        <Button htmlType="submit" onClick={handleSignOut}>
          Sign out
        </Button>
        <h1>My Todo List</h1>
        <div>
          <TaskForm />
          <div>
            {/* Display tasks */}
            <h1>Your Tasks</h1>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.taskname} - {task.taskStatus}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
