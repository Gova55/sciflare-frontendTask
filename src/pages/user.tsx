/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ApiClient from "../network/Apiclients";
import { Button, Pagination, Table, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Adduser from "./usertable.tsx/Adduser";
import Edituser from "./usertable.tsx/Edituser";
import Layout from "../components/layout";

function User() {
  const [user, setUser] = useState<any>({
    data: [],
    totalPages: 0,
  });

  const [page, setPage] = useState(1);
  const [search, setsearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await ApiClient.get<any>("user", {
        params: {
          page: page,
          search: search,
        },
      });
      if (response.status == 200 || response.status == 201) {
        setUser(response?.data?.data ?? []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const row = user?.data?.map((Element: any, index: number) => (
    <Table.Tr key={index}>
      <Table.Td>{index + (user?.from ?? 0)}</Table.Td>
      <Table.Td>{Element.firstName}</Table.Td>
      <Table.Td>{Element.lastName}</Table.Td>
      <Table.Td>{Element.email}</Table.Td>
      <Table.Td>{Element.phoneNumber}</Table.Td>
      <Table.Td>{Element.role.name}</Table.Td>
      <Table.Td>
        <Edituser fetchUser={fetchData} editUser={Element} />
      </Table.Td>
    </Table.Tr>
  ));

  const onSearch = () => {
    fetchData();
  };

  return (
    <Layout>
      <div className="p-4 bg-white ">
        <div className=" p-4  flex flex-col space-y-4">
          <div className="flex flex-row  justify-between">
            <div className="font-semibold text-lg">User</div>
            <div className="flex flex-row space-x-4">
              <Adduser fetchUser={fetchData} />
              <TextInput
                placeholder="search"
                onChange={(e) => setsearch(e.target.value)}
              ></TextInput>
              <Button onClick={() => onSearch()}>
                <IconSearch
                  size={18}
                  strokeWidth={2}
                  color={"white"}
                  className="mr-2"
                />
                Search
              </Button>
            </div>
          </div>

          <Table withColumnBorders withTableBorder>
            <Table.Thead style={{ background: "#d1e4f0" }}>
              <Table.Tr>
                <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>FIRSTNAME</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>LASTNAME</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>EMAIL</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>PHONENUMBER</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>ROLE</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>ACTION</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="text-center">{row}</Table.Tbody>
          </Table>
          <div className="flex flex-row justify-between">
            <div>
              Showing data form:{user.from} to:{user.to}
            </div>
            <div>
              <Pagination
                total={user.totalPages}
                onChange={(e: any) => setPage(e)}
                radius="xl"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default User;
