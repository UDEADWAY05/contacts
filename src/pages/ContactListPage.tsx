import { useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { useGetContactQuery } from 'src/redux/contacts';
import { useGetGroupsQuery } from 'src/redux/group';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';


export const ContactListPage = () => {
  const contactsState = useGetContactQuery();
  const groupContactsState = useGetGroupsQuery();
  const [groupContactsData, setGroupContactsData] = useState<GroupContactsDto[]>(groupContactsState.data ? groupContactsState.data : [])
  const [contactsData, setContactsData] = useState<ContactDto[]>(contactsState.data ? contactsState.data : [])

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


  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contactsState.data? contactsState.data : [] ;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupFindContacts = groupContactsData.find(({id}) => id === fv.groupId);

      if (groupFindContacts) {
        findContacts = findContacts.filter(({id}) => (
          groupFindContacts.contactIds.includes(id)
        ))
      }
    }

    setContactsData(findContacts)
  }

  return (
    <Row xxl={1} className='d-flex flex-column'>
      <Col className="mb-3">
        <FilterForm groupContactsList={groupContactsData} initialValues={{}} onSubmit={onSubmit} />
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
    </Row>
  );
}
