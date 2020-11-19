package com.project.service.impl;

import com.project.model.Interface.ISaticalPerson;
import com.project.model.Interface.IStaticalDeclared;
import com.project.model.Interface.impl.StaticDeclared;
import com.project.model.Person;
import com.project.repository.PersonRepository;
import com.project.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public List<Person> findAll(Long pageSize, Long pageIndex) {
        return personRepository.findAll(pageSize, pageIndex);
    }

    @Override
    public List<Person> findBasic(Long isDelete, Long pageSize, Long pageIndex) {
        return personRepository.findBasic(isDelete, pageSize, pageIndex);
    }


    @Override
    public void deleteById(Long id_person) {
        personRepository.deleteById(id_person);
    }

    @Override
    public void undeleteById(Long id_person) {
        personRepository.undeleteById(id_person);
    }

    @Override
    public void save(Person person) {
        personRepository.save(person);
    }

    @Override
    public Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }


    @Override
    public ISaticalPerson countPersonByDate(Date date) {
        return personRepository.countPersonByDate(date);
    }

    @Override
    public List<Person> findPersonByDate(Date date,Long pageSize, Long pageIndex) {
        return personRepository.findPersonByDate(date, pageSize, pageIndex);
    }

    @Override
    public List<Person> findListPersonBySymptom(Date startDate, Date endDate, Long id_symptom, Long pageSize, Long pageIndex) {
        return personRepository.findListPersonBySymptom(startDate, endDate, id_symptom,  pageSize, pageIndex);
    }

    @Override
    public List<Person> findListPersonByContact(Date startDate, Date endDate, Long id_contact,  Long pageSize, Long pageIndex) {
        return personRepository.findListPersonByContact(startDate, endDate, id_contact,  pageSize, pageIndex);
    }

    @Override
    public void update(String full_name, String passport_number, String phone_number, String email, Date yob, String gender, String id_province, String id_district, String id_ward, String street, String act_in14days, Date date, Long khaiho,Long declared,Long is_delete, Long id_person) {
        personRepository.update(full_name, passport_number, phone_number, email, yob, gender, id_province, id_district, id_ward, street, act_in14days, date, khaiho, declared, is_delete, id_person);
    }

    @Override
    public void create(Person person) {
        personRepository.create(person);
    }

    @Override
    public Long sumAll() {
        return personRepository.sumAll();
    }

    @Override
    public Long sumBasic(Long isDelete) {
        return personRepository.sumBasic(isDelete);
    }

    @Override
    public Long sumPersonByDare(Date date) {
        return personRepository.sumPersonByDate(date);
    }

    @Override
    public Long sumPersonBySymptom(Date startDate, Date endDate, Long id_symptom) {
        return personRepository.sumPersonBySymptom(startDate, endDate, id_symptom);
    }

    @Override
    public Long sumPersonByContact(Date startDate, Date endDate, Long id_contact) {
        return personRepository.sumPersonByContact(startDate, endDate, id_contact);
    }

    @Override
    public Person findByPassPortNumber(String passport_number) {
        return personRepository.findByPassportNumber(passport_number);
    }

}
