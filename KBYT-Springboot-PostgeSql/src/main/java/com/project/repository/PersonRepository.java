package com.project.repository;

import com.project.model.Interface.ISaticalPerson;
import com.project.model.Interface.IStaticalDeclared;
import com.project.model.Interface.impl.StaticDeclared;
import com.project.model.Person;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Date;
import java.util.List;

@Component
public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

    @Query(value = "SELECT * FROM person WHERE declared = 1 ORDER BY id_person LIMIT :pageSize OFFSET :pageIndex", nativeQuery = true)
    List<Person>findAll(@Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    @Query(value = "SELECT * FROM person WHERE declared = 1 and is_delete = :isDelete ORDER BY id_person LIMIT :pageSize OFFSET :pageIndex", nativeQuery = true)
    List<Person> findBasic(@Param("isDelete") Long isDelete, @Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    @Modifying
    @Query(value = "UPDATE person SET is_delete = 1 WHERE id_person = :id_person", nativeQuery = true)
    void deleteById(@Param("id_person") Long id_person);

    @Modifying
    @Query(value = "UPDATE person SET is_delete = 0 WHERE id_person = :id_person", nativeQuery = true)
    void undeleteById(@Param("id_person") Long id_person);

    @Query(value = "SELECT * FROM person WHERE passport_number = :passport_number", nativeQuery = true)
    Person findByPassportNumber(@Param("passport_number") String passport_number);

    @Query(value="Select count(*) as count, date as date from person  WHERE declared = 1 and is_delete = 0 and person.date =:date group by date ",nativeQuery=true)
    ISaticalPerson countPersonByDate(@Param("date") Date date );

    @Query(value="SELECT SUM(declared) as declared FROM person  WHERE declared = 1 and is_delete = 0 and person.date =:date group by date ",nativeQuery=true)
    Long sumPersonByDate(@Param("date") Date date );

    @Query(value="SELECT SUM(declared) FROM person INNER JOIN symptom on symptom.id_person = person.id_person WHERE declared = 1 and is_delete = 0 and person.date >= :startDate and person.date <= :endDate and id_symptom = :id_symptom",nativeQuery=true)
    Long sumPersonBySymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("id_symptom") Long id_symptom );

    @Query(value="SELECT SUM(declared) FROM person INNER JOIN contact on contact.id_person = person.id_person WHERE declared = 1 and is_delete = 0 and person.date >= :startDate and person.date <= :endDate and id_contact = :id_contact",nativeQuery=true)
    Long sumPersonByContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("id_contact") Long id_contact );

    @Query(value="select * from person where declared = 1 and is_delete = 0 and date =:date ORDER BY id_person LIMIT :pageSize OFFSET :pageIndex", nativeQuery=true)
    List<Person> findPersonByDate(@Param("date") Date date,  @Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    @Query(value="SELECT * FROM symptom inner join listsymptom on symptom.id_symptom=listsymptom.id_symptom inner join person on person.id_person = symptom.id_person WHERE person.declared = 1 and person.is_delete = 0 and person.date >= :startDate AND person.date <= :endDate and listsymptom.id_symptom = :symptom ORDER BY person.id_person LIMIT :pageSize OFFSET :pageIndex", nativeQuery = true)
    List<Person> findListPersonBySymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("symptom") Long id_symptom,  @Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    @Query(value="SELECT * FROM contact inner join listcontact on contact.id_contact=listcontact.id_contact inner join person on contact.id_person = person.id_person WHERE person.declared = 1 and person.is_delete = 0 and person.date >= :startDate AND person.date <= :endDate and listcontact.id_contact = :contact ORDER BY person.id_person LIMIT :pageSize OFFSET :pageIndex", nativeQuery = true)
    List<Person> findListPersonByContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("contact") Long id_contact,  @Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    @Modifying
    @Query(value = "INSERT INTO person () VALUES ()", nativeQuery = true)
    void create(@RequestBody Person person);

    @Modifying
    @Query(value = "UPDATE person SET full_name = :full_name , passport_number = :passport_number, phone_number = :phone_number, email = :email, yob = :yob, gender = :gender, id_province = :id_province, id_district = :id_district, id_ward = :id_ward, street = :street, act_in14days =:act_in14days, date = :date, khaiho = :khaiho, declared = :declared, is_delete = :is_delete WHERE id_person = :id_person", nativeQuery = true)
    void update(@Param("full_name") String full_name, @Param("passport_number") String passport_number, @Param("phone_number") String phone_number,
               @Param("email") String email, @Param("yob") Date yob, @Param("gender") String gender, @Param("id_province") String id_province,
               @Param("id_district") String id_district, @Param("id_ward") String id_ward, @Param("street") String street,
               @Param("act_in14days") String act_in14days, @Param("date") Date date, @Param("khaiho") Long khaiho, @Param("declared") Long declared, @Param("is_delete") Long is_delete, @Param("id_person") Long id_person);

    @Modifying
    @Query(value="UPDATE person SET id_province = :id_province, id_district = :id_district, id_ward = :id_ward WHERE id_person = :personId", nativeQuery = true)
    void saveAddress(@Param("id_province") String id_province, @Param("id_district") String id_district, @Param("id_ward") String id_ward, @Param("personId") Long personId);

//    @Query(value = "SELECT SUM(declared) as declared FROM person WHERE declared = 1", nativeQuery = true)
//    IStaticalDeclared sum();

    @Query(value = "SELECT SUM(declared) as declared FROM person WHERE declared = 1", nativeQuery = true)
    Long sumAll();

    @Query(value = "SELECT SUM(declared) as declared FROM person WHERE declared = 1 and is_delete = :isDelete", nativeQuery = true)
    Long sumBasic(@Param("isDelete") Long isDelete);
}
