package com.project.repository;


import com.project.model.Contact;
import com.project.model.ListContact;
import com.project.model.ListSymptom;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface ContactRepository extends PagingAndSortingRepository<Contact, Long> {
    @Query(value="SELECT * FROM contact INNER JOIN listcontact ON contact.id_contact = listcontact.id_contact WHERE id_person = :id",nativeQuery=true)
    List<Contact> findContactsByPersonId(@Param("id") Long id_person);


    @Modifying
    @Query(value="INSERT INTO contact (id_contact, id_person) VALUES (:id_contact, :id_person)", nativeQuery = true)
    void saveContact(@Param("id_contact") Long id_contact, @Param("id_person") Long id_person);

    @Modifying
    @Query(value="DELETE  FROM contact WHERE id_person = :id_person", nativeQuery = true)
    void deleteContactByPerson(@Param("id_person") Long id_person);

    @Query(value="SELECT * FROM listContact WHERE id_contact <> :id1 and id_contact <> :id2 and id_contact <> :id3 ",nativeQuery=true)
    List<Map<Long, ListContact>> findContactByIdContact(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3);

}
