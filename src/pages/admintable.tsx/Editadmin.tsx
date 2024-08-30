/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, TextInput, Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import ApiClient from "../../network/Apiclients";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

function Editadmin({ editAdmin,fetchAdmin }: any) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      roleId: "",
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    try {
      const setAdmin = {
        name: values.name,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        roleId: Number(values.roleId),
      };
      const response = await ApiClient.patch(
        `/admin/${editAdmin.admin.id}`,
        setAdmin
      );
      const message = "user Edited successfully";
      if (response.status == 200 || response.status == 201) {
        notifications.show({
          color: "green",
          message: message,
        });
        close();
        fetchAdmin();
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

  function setForm() {
    form.setFieldValue("name", editAdmin.admin.name);
    form.setFieldValue("firstName", editAdmin.firstName);
    form.setFieldValue("lastName", editAdmin.lastName),
      form.setFieldValue("email", editAdmin.email),
      form.setFieldValue("roleId", String(editAdmin.role?.id)),
      form.setFieldValue("phoneNumber", editAdmin.phoneNumber);
  }

  useEffect(() => {
    if (opened) {
      setForm();
    }
  }, [opened]);
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        title={<div className="text-lg font-bold">Edit Admin</div>}
      >
        <form onSubmit={form.onSubmit(onSubmit)} className="pb-2">
          <div className="space-y-3 flex flex-col">
            <div className="flex flex-row space-x-5">
              <TextInput
                {...form.getInputProps("firstName")}
                label="First Name"
                withAsterisk
                placeholder="Enter Name"
                className="w-6/12 text-gray-600"
              />
              <TextInput
                {...form.getInputProps("lastName")}
                label="Last Name"
                withAsterisk
                placeholder="Enter Name"
                className="w-6/12 text-gray-600"
              />
            </div>
            <TextInput
              {...form.getInputProps("name")}
              label=" name"
              withAsterisk
              placeholder="name"
              className="text-gray-600"
            />
            <TextInput
              {...form.getInputProps("email")}
              label=" Email"
              withAsterisk
              placeholder="Email"
              className="text-gray-600"
            />
            <TextInput
              {...form.getInputProps("phoneNumber")}
              label="Number"
              withAsterisk
              placeholder="number"
              className="text-gray-600"
            />
            <Select
              {...form.getInputProps("roleId")}
              label="Role"
              withAsterisk
              placeholder="select Role"
              className="text-gray-600"
              data={[{ value: "1", label: "Admin" }]}
              onChange={(value: any) => onRoleChange(value)}
            />
            <div className="flex justify-end mt-5 mb-2">
              <Button color="red" className="mr-2" onClick={close}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </div>
        </form>
      </Modal>
      <Button size="xs" onClick={open} variant="light">
        <IconEdit size={18} strokeWidth={2} color={"blue"} className="mr-2" />
        Edit
      </Button>
    </div>
  );
}

export default Editadmin;
