"use client";
import { Button, Form, Input } from "antd";
import { supabase } from "../../../supabase/supabase.js";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
import { useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { Header } from "antd/es/layout/layout.js";
dotenv.config();

export default function AuthForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  async function handleLogin(values: any) {
    setIsSigningIn(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    //console.log({ error, data });
    if (!error) {
      router.push("/todo");
    } else {
      setIsSigningIn(false);
    }

    //console.log(values);
  }

  async function handleSignUp(values: any) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (!error) {
      setIsSigningUp(true);
    }
    //console.log({ data, error });
  }

  let signInMessage = "Sign In";

  if (isSigningIn) {
    signInMessage = "Signing In";
  } else if (isNewUser) {
    signInMessage = "Sign Up";
  }

  const signUpMessage = (
    <p className="text-center">
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
    <div className="flex justify-center items-center min-h-screen bg-slate-300">
      <div className="bg-white w-96 p-6 shadow-md rounded-sm">
        <p className="text-3xl p-3 text-center block font-semibold">
          {isNewUser ? <h1>Sign Up</h1> : <h1>Welcome Back!</h1>}
        </p>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="text-center block"
        >
          <></>
          <Form.Item<FieldType>
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" className="block rounded-3xl" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" className="rounded-3xl" />
          </Form.Item>

          <Button
            htmlType="submit"
            block
            className="text-white bg-blue-700 hover:bg-white text-center rounded-3xl"
          >
            {signInMessage}
          </Button>
          {/* <Button type="primary" htmlType="submit" className="margin-top: 10px;">
          
        </Button> */}

          <p className="text-center mt-5">
            {isNewUser ? (
              <>
                Already have an account?{" "}
                <Button type="link" onClick={() => setIsNewUser(false)}>
                  Sign In
                </Button>
              </>
            ) : (
              <>
                Dont have an account?{" "}
                <Button type="link" onClick={() => setIsNewUser(true)}>
                  Sign Up
                </Button>
              </>
            )}
          </p>
          {isSigningUp && signUpMessage}
        </Form>
      </div>
    </div>
  );
}
