import {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { observer } from 'mobx-react-lite';
import { groupsStore } from 'src/store/groupsStore';
import { contactsStore } from 'src/store/contactsStore';

export const GroupPage = observer(({
}) => {
  const {groupId} = useParams<{ groupId: string }>();
  const groupContactsData = groupsStore.groups
  const [contactsData, setContactsData] = useState<ContactDto[]>(contactsStore.contacts)
  const [groupContacts, setGroupContacts] = useState<GroupContactsDto>();

  useEffect(() => {
    const findGroup = groupContactsData.find(({id}) => id === groupId);
    setGroupContacts(findGroup);
    setContactsData(() => {
      if (findGroup) {
        return contactsData.filter(({id}) => findGroup.contactIds.includes(id))
      }
      return [];
    });
  }, [groupId]);

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contactsData.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : <Empty />}
    </Row>
  );
});
