import {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {ContactDto} from 'src/types/dto/ContactDto';
import { useAppSelector } from 'src/redux/hooks';
import { useGetContactQuery } from 'src/redux/contacts';

export const FavoritListPage = memo(() => {
  const contactsState = useGetContactQuery();
  const contactsData: ContactDto[] = contactsState.data ? contactsState.data : []
  const favoriteContactsState = useAppSelector(state => state.favourites)
  const [contacts, setContacts] = useState<ContactDto[]>(contactsData)

  useEffect(() => {
    setContacts(() => contactsData.filter(({id}) => favoriteContactsState.includes(id)));
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