import {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import { useGetGroupsQuery } from 'src/redux/group';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const GroupListPage = memo(() => {
  const groupContactsState = useGetGroupsQuery()
  const groupContactsData: GroupContactsDto[] = groupContactsState.data ? groupContactsState.data : []
  return (
    <Row xxl={4}>
      {groupContactsData.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
