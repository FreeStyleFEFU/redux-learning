import { FC } from "react";

import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";

import { UserList } from "../../components/users/UserList/UserList";
import { Container } from "../../components/common/Container/Container";

export const Users: FC = () => (
  <DefaultLayout>
    <Container>
      <UserList />
    </Container>
  </DefaultLayout>
);
