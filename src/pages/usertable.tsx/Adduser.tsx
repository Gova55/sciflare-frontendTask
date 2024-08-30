/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from "@mantine/hooks";
import ApiClient from "../../network/Apiclients";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Modal, TextInput, PasswordInput, Button, Select } from "@mantine/core";
import { useState } from "react";

function Adduser({ fetchUser }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const [roleId, setroleId] = useState("");

  const form = useForm({
    initialValues: {
      validateInputOnChange: true,
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phoneNumber: "",
      roleId: "",
    },

    validate: {
      firstName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : "First Name Contain Alphabet letters only",
      lastName: (value) =>
        /^[a-zA-Z ]{1,15}$/.test(value)
          ? null
          : "Last Name Contain Alphabet letters only",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid Password",
      phoneNumber: (value) =>
        value.length === 10 ? null : "Invalid PhoneNumber",
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    try {
      const setdata = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        roleId: Number(values.roleId),
      };

      const response = await ApiClient.post("/user", setdata);
      const message = "User added successfully";

      if (response.status == 200 || response.status == 201) {
        notifications.show({
          title: "Success",
          message: message,
        });
        close();
        fetchUser();
      } else {
        notifications.show({
          color: "red",
          title: "Error",
          message: "no user Added",
        });
      }
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: "Error",
        message: error.response.data.message,
      });
    }
  };

  function onRoleChange(value: string) {
    form.setFieldValue("roleId", value);
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        title={<div className="text-lg font-bold">Add User</div>}
      >
        <form onSubmit={form.onSubmit(onSubmit)} className="pb-2 rounded-lg">
          <div className="space-y-3 flex flex-col">
            <div className="flex flex-row space-x-5">
              <TextInput
                {...form.getInputProps("firstName")}
                label="FirstName"
                withAsterisk
                placeholder="Enter Name"
                className="w-6/12"
              />
              <TextInput
                {...form.getInputProps("lastName")}
                label="Last Name"
                withAsterisk
                placeholder="Enter Name"
                className="w-6/12"
              />
            </div>
            <TextInput
              {...form.getInputProps("email")}
              label=" Email"
              withAsterisk
              placeholder="Email"
            />
            <TextInput
              {...form.getInputProps("phoneNumber")}
              label="Number"
              withAsterisk
              placeholder="number"
            />
            <Select
              {...form.getInputProps("roleId")}
              label="roleId"
              withAsterisk
              placeholder="select roleId"
              data={[
                { value: "1", label: "Admin" },
                { value: "2", label: "User" },
              ]}
              value={form.values.roleId.toString()}
              onChange={(value: any) => onRoleChange(value)}
            />

            <PasswordInput
              {...form.getInputProps("password")}
              label="Password"
              withAsterisk
              placeholder="Password"
            />

            <div className="flex justify-end mt-5 mb-2 p-2">
              <Button color="red" className="mr-2" onClick={close}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </div>
        </form>
      </Modal>

      <Button onClick={open}>Add User</Button>
    </div>
  );
}

export default Adduser;
