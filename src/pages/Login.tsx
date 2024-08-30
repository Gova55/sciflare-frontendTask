/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import ApiClient from "../network/Apiclients";
import { useState, useEffect } from "react";

function Login() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "password must have at least 8 letters" : null,
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const result = await ApiClient.post<any>("auth", data);

      if (result.status == 200 || result.status == 201) {
        localStorage.setItem("token", result.data.data.token);
        localStorage.setItem("firstName", result.data.data.firstName);
        localStorage.setItem("isAdmin", String(result.data?.data?.isAdmin));
        console.log(String(result.data?.data?.isAdmin));

        if (result.data?.data?.isAdmin == true) {
          navigate("/Admin");
        } else {
          navigate("/User");
        }
      } else {
        notifications.show({
          color: "red",
          title: "Notification with custom styles",
          message: result.data?.data.message,
        });
      }
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: "Error",
        message: error.response?.data?.message,
      });
      console.log(error.message, "error");
    }
  };
  return (
    <div className="flex bg-gradient-to-r from-cyan-200 to-violet-300 min-h-screen items-center justify-center">
      <div
        className={`absolute left-5 top-0 m-5 text-4xl font-extrabold italic text-black fade-in-text ${
          isVisible ? "visible" : ""
        } `}
      ></div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div
          className={`bg-white bg-opacity-40 flex rounded-2xl fade-in-text ${
            isVisible ? "visible" : ""
          } `}
        >
          <div className="text-3xl font-semibold m-10 mt-10 text-black">
            Login
            <TextInput
              label="Email"
              placeholder="Your email"
              withAsterisk
              mt="md"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="password"
              {...form.getInputProps("password")}
            />
            <div className="flex flex-col mt-7 w-96 rounded-3xl">
              <Button type="submit" className="p-9" color="cyan">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
