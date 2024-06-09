import {FC, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { contactsStore } from 'src/store/contactsStore';
import { observer } from 'mobx-react-lite';


export const ContactPage: FC = observer(() => {
  const contactsState = contactsStore.contacts;
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<ContactDto>();

  useEffect(() => {
    setContact(() => contactsState.find(({ id }) => id === contactId));
  }, [contactId]);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
});
