package com.project.repository;

import com.project.model.Interface.ISaticalContact;
import com.project.model.ListContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public interface ContactListRepository extends PagingAndSortingRepository<ListContact, Long> {
    @Query(value=" SELECT count(*) as count,listcontact.contact as listContact, listContact.id_contact as contactId FROM contact inner join listcontact on contact.id_contact=listcontact.id_contact inner join person on contact.id_person = person.id_person WHERE declared = 1 and is_delete = 0 and person.date >= :startDate AND person.date <= :endDate group by listcontact.contact, listcontact.id_contact;", nativeQuery = true)
    List<ISaticalContact> countListContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
