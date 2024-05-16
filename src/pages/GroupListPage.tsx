import { observer } from 'mobx-react-lite';
import {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import { groupsStore } from 'src/store/groupsStore';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const GroupListPage = observer(() => {
  const groupContactsData: GroupContactsDto[] = groupsStore.groups
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
