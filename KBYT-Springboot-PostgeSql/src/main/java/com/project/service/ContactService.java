package com.project.service;

import com.project.model.Contact;
import com.project.model.ListContact;
import com.project.model.ListSymptom;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ContactService {
    Contact save(Contact contact);

    List<Contact> findContactsByPersonId(@Param("id") Long id_person);

    void saveContact(@Param("id_contact") Long id_contact, @Param("id_person") Long id_person);

    void deleteContactByPerson(@Param("id_person") Long id_person);

    List<Map<Long, ListContact>>  findContactByIdContact(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3);
}
