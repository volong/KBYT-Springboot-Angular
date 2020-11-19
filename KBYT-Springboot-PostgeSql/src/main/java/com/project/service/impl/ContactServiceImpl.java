package com.project.service.impl;

import com.project.model.Contact;
import com.project.model.ListContact;
import com.project.model.ListSymptom;
import com.project.repository.ContactRepository;
import com.project.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public Contact save(Contact contact) {
        contactRepository.save(contact);
        return contact;
    }

    @Override
    public List<Contact> findContactsByPersonId(@Param("id") Long id_person) {
        return contactRepository.findContactsByPersonId(id_person);
    }

    @Override
    public void saveContact(Long id_contact, Long id_person) {
        contactRepository.saveContact(id_contact, id_person);
    }

    @Override
    public void deleteContactByPerson(Long id_person) {
        contactRepository.deleteContactByPerson(id_person);
    }

    @Override
    public  List<Map<Long, ListContact>>  findContactByIdContact(Long id1, Long id2, Long id3) {
      return   contactRepository.findContactByIdContact(id1, id2, id3);
    }
}
