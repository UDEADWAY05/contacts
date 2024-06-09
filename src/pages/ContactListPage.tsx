import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import { contactsStore } from 'src/store/contactsStore';
import { groupsStore } from 'src/store/groupsStore';
import {ContactDto} from 'src/types/dto/ContactDto';


export const ContactListPage = observer(() => {
  const contactsState = contactsStore.contacts
  const groupContactsState = groupsStore.groups;
  const [contactsData, setContactsData] = useState<ContactDto[]>(contactsState)

  useEffect(() => {
    setContactsData(contactsState)
  }, [contactsState])

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contactsData;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupFindContacts = groupContactsState.find(({id}) => id === fv.groupId);

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
        <FilterForm groupContactsList={groupContactsState} initialValues={{}} onSubmit={onSubmit} />
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
})
