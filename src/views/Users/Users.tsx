import { FC } from 'react';

import { UserList } from '../../components/users/UserList/UserList';
import { Container } from '../../components/common/Container/Container';

export const Users: FC = () => (
    <div>
        <Container>
            <UserList />
        </Container>
    </div>
);
