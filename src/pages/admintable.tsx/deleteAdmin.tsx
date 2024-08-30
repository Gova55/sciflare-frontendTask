/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ApiClient from "../../network/Apiclients";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

function deleteAdmin({ deleteAdmin,fetchAdmin }: any) {
  const onSubmit = async () => {
    console.log("OnSubmit");
    try {
      const response = await ApiClient.patch(
        `/admin/delete/${deleteAdmin.admin.id}`
      );
      const message = "Admin deleted successfully";
      if (response.status == 200 || response.status == 201) {
        notifications.show({
          color: "green",
          message: message,
        });
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

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete the user?</Text>
      ),
      labels: { confirm: "Yes", cancel: "No" },
      confirmProps: { color: "red" },
      onCancel: () => modals.closeAll(),
      onConfirm: () => onSubmit(),
    });

  return (
    <Button
      size="compact-sm"
      leftSection={<IconTrash size={14} />}
      onClick={openDeleteModal}
      color="red"
    >
      Remove
    </Button>
  );
}

export default deleteAdmin;
