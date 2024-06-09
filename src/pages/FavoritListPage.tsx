import { observer } from 'mobx-react-lite';
import {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { contactsStore } from 'src/store/contactsStore';
import { favoritesStore } from 'src/store/favoritesStore';
import {ContactDto} from 'src/types/dto/ContactDto';

export const FavoritListPage = observer(() => {
  const contactsState = contactsStore.contacts
  const favoriteContactsState = favoritesStore.favorites
  const [contacts, setContacts] = useState<ContactDto[]>(contactsState)

  useEffect(() => {
    setContacts(() => contactsState.filter(({id}) => favoriteContactsState.includes(id)));
  }, [contactsState, favoriteContactsState])

  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
})