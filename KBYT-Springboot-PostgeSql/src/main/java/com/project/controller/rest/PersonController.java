package com.project.controller.rest;


import com.project.model.*;
import com.project.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class PersonController {

    Long currentId;

    @Autowired
    private PersonServiceImpl personServiceImpl;

    @Autowired
    private SymptomServiceImpl symptomServiceImpl;

    @Autowired
    private ContactServiceImpl contactServiceImpl;

    @Autowired
    private SickServiceImpl sickServiceImpl;

    //Find person by Id_person
    @GetMapping(value = "/person/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Optional<Person> viewPerson(@PathVariable("id") Long id) {
        return personServiceImpl.findById(id);
    }

    //Find person by Passport Number
    @GetMapping(value = "/person/passport/{passport_number}")
    public Person findByPassport(@PathVariable("passport_number") String passport_number){
        return personServiceImpl.findByPassPortNumber(passport_number);
    }

    // Create person and return id_person
    @PostMapping(value = "/person")
    long create(@RequestBody Person person){
        personServiceImpl.save(person);
        currentId = person.getId_person();
        return currentId;
    }

    // Update person method
    @PutMapping(value = "/person")
    void update(@Param("full_name") String full_name, @Param("passport_number") String passport_number, @Param("phone_number") String phone_number,
                @Param("email") String email, @Param("yob") java.sql.Date yob, @Param("gender") String gender, @Param("id_province") String id_province,
                @Param("id_district") String id_district, @Param("id_ward") String id_ward, @Param("street") String street,
                @Param("act_in14days") String act_in14days, @Param("date") Date date, @Param("khaiho") Long khaiho, @Param("declared") Long declared, @Param("is_delete") Long is_delete, @Param("id_person") Long id_person){
        personServiceImpl.update(full_name, passport_number, phone_number, email, yob, gender, id_province, id_district, id_ward, street, act_in14days, date, khaiho, declared, is_delete, id_person);
    }

    // Save Symptom data with id_person
    @PostMapping(value="/addsymptom" )
    void saveSymptom(
            @Param("param[]") Long[] param, @Param("id_person") Long id_person) {
        int i;
        for (i = 0; i < param.length; i++) {
            Long id_symptom = param[i];
            symptomServiceImpl.saveSymptom(id_symptom, id_person);
        }
    }

    // Save Contact data with id_person
    @PostMapping(value = "/addcontact")
    void saveContact(@Param("param[]") Long[] param, @Param("id_person") Long id_person){
        int i;
        for (i = 0; i < param.length; i++) {
            Long id_contact = param[i];
            contactServiceImpl.saveContact(id_contact, id_person);
        }    }

    // Save Sick data with id_person
    @PostMapping(value = "/addsick")
    void saveSick(@Param("param[]") Long[] param, @Param("id_person") Long id_person) {
        int i;
        for (i = 0; i < param.length; i++) {
            Long id_sick = param[i];
            sickServiceImpl.saveSick(id_sick, id_person);
        }    }

    @PutMapping(value = "/delete")
    void deleteById(@Param("id_person") Long id_person){
        personServiceImpl.deleteById(id_person);
    }

    @PutMapping(value = "/undelete")
    void undeleteById(@Param("id_person") Long id_person){
        personServiceImpl.undeleteById(id_person);
    }


    @PutMapping(value="/otherlist/symptom")
    public List<Map<Long, ListSymptom>> findSymptombyIdsymptom(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3, @Param("id4") Long id4, @Param("id5") Long id5, @Param("id6") Long id6){
       return symptomServiceImpl.findSymptomsByIdSymptom(id1, id2, id3, id4, id5, id6);
    }

    @PutMapping(value="/otherlist/contact")
    public List<Map<Long, ListContact>> findContactByIdContact(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3){
        return contactServiceImpl.findContactByIdContact(id1, id2, id3);
    }

    @PutMapping(value="/otherlist/sick")
    public List<Map<Long, ListSick>> findSickByIdSick(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3, @Param("id4") Long id4, @Param("id5") Long id5, @Param("id6") Long id6,@Param("id7") Long id7, @Param("id8") Long id8, @Param("id9") Long id9, @Param("id10") Long id10){
        return sickServiceImpl.findSickByIdSick(id1, id2, id3, id4, id5, id6, id7, id8, id9, id10);
    }

    @PutMapping(value="/delete/symptom")
    public void deleteSymptomByPerson(@Param("id_person") Long id_person){
        symptomServiceImpl.deleteSymptomByPerson(id_person);
    }

    @PutMapping(value="/delete/contact")
    public void deleteContactByPerson(@Param("id_person") Long id_person){
        contactServiceImpl.deleteContactByPerson(id_person);
    }

    @PutMapping(value="/delete/sick")
    public void deleteSickByPerson(@Param("id_person") Long id_person){
        sickServiceImpl.deleteSickByPerson(id_person);
    }


}
