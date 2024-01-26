"use client";
import { Button, Form, Input } from "antd";
import { supabase } from "../../../supabase/supabase.js";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
import { useState } from "react";
dotenv.config();

export default function AuthForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  async function handleLogin(values: any) {
    setIsSigningIn(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    console.log({ error, data });
    if (!error) {
      router.push("/todo");
    } else {
      setIsSigningIn(false);
    }

    console.log(values);
  }

  async function handleSignUp(values: any) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (!error) {
      setIsSigningUp(true);
    }
    console.log({ data, error });
    console.log("sus", values);
  }

  let signInMessage = "Sign In";

  if (isSigningIn) {
    signInMessage = "Signing In";
  } else if (isNewUser) {
    signInMessage = "Sign Up";
  }

  const signUpMessage = (
    <p className="text-center text-white">
      Email sent! Check your email to confirm sign up.
    </p>
  );

  const onFinish = (values: any) => {
    isNewUser ? handleSignUp(values) : handleLogin(values);
  };

  type FieldType = {
    email?: string;
    password?: string;
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {signInMessage}
      </Button>

      <p className="text-center text-white">
        {isNewUser ? (
          <>
            Already have an account?{" "}
            <Button onClick={() => setIsNewUser(false)}>Sign In</Button>
          </>
        ) : (
          <>
            Dont have an account?{" "}
            <Button onClick={() => setIsNewUser(true)}>Sign Up</Button>
          </>
        )}
      </p>
      {isSigningUp && signUpMessage}
    </Form>
  );
}
