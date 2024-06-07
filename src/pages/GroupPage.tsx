import {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { useGetContactQuery } from 'src/redux/contacts';
import { useGetGroupsQuery } from 'src/redux/group';

export const GroupPage = memo(({
}) => {
  const {groupId} = useParams<{ groupId: string }>();
  const contactsState = useGetContactQuery();
  const groupContactsState = useGetGroupsQuery();
  const [groupContactsData, setGroupContactsData] = useState<GroupContactsDto[]>(groupContactsState.data ? groupContactsState.data : [])
  const [contactsData, setContactsData] = useState<ContactDto[]>(contactsState.data ? contactsState.data : [])
  const [groupContacts, setGroupContacts] = useState<GroupContactsDto>();

  useEffect(() => { 
    if (groupContactsState.data !== undefined) {
      setGroupContactsData(groupContactsState.data)
    }
  }, [groupContactsState.data])

  useEffect(() => { 
    if (contactsState.data !== undefined) {
      setContactsData(contactsState.data)
    }
  }, [contactsState.data])


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
