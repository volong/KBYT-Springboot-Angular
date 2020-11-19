package com.project.service;

import com.project.model.Interface.ISaticalPerson;
import com.project.model.Interface.IStaticalDeclared;
import com.project.model.Interface.impl.StaticDeclared;
import com.project.model.Person;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface PersonService {
    Optional<Person> findById(Long id);

    void save(Person person);

    List<Person> findAll(@Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);
    List<Person> findBasic(@Param("isDelete") Long isDelete, @Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    void deleteById(@Param("id_person") Long id_person);

    void undeleteById(@Param("id_person") Long id_person);

    ISaticalPerson countPersonByDate(@Param("date") Date date );

    List<Person> findPersonByDate(@Param("date") Date date,  @Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    List<Person> findListPersonBySymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("symptom") Long id_symptom,@Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    List<Person> findListPersonByContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("contact") Long id_contact,@Param("pageSize") Long pageSize, @Param("pageIndex") Long pageIndex);

    void update(@Param("full_name") String full_name, @Param("passport_number") String passport_number, @Param("phone_number") String phone_number,
              @Param("email") String email, @Param("yob") Date yob, @Param("gender") String gender, @Param("id_province") String id_province,
              @Param("id_district") String id_district, @Param("id_ward") String id_ward, @Param("street") String street,
              @Param("act_in14days") String act_in14days, @Param("date") Date date, @Param("khaiho") Long khaiho, @Param("declared") Long declared, @Param("is_delete") Long is_delete, @Param("id_person") Long id_person);

    void create(@RequestBody Person person);

    Long sumAll();

    Long sumBasic(@Param("isDelete") Long isDelete);

    Long sumPersonByDare(@Param("date") Date date);

    Long sumPersonBySymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("id_symptom") Long id_symptom);

    Long sumPersonByContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("id_symptom") Long id_contact);

    Person findByPassPortNumber(@Param("passport_number") String passport_number);


}

