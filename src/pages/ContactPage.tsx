import {FC, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { useGetContactQuery } from 'src/redux/contacts';


export const ContactPage: FC = () => {
  const contactsState = useGetContactQuery();
  const contactsData = contactsState.data ? contactsState.data : []
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<ContactDto>();

  useEffect(() => {
    setContact(() => contactsData.find(({id}) => id === contactId));
  }, [contactId]);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
