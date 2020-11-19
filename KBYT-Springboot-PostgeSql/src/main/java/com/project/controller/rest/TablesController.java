package com.project.controller.rest;

import com.project.model.Interface.IStaticalDeclared;
import com.project.model.Interface.impl.StaticDeclared;
import com.project.model.Person;
import com.project.service.impl.PersonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class TablesController {

    @Autowired
    private PersonServiceImpl personServiceImpl;

    //List all persons
    @GetMapping("/all/persons/{pageSize}/{pageIndex}")
    public List<Person> allPerson(@PathVariable("pageSize") Long pageSize, @PathVariable("pageIndex") Long pageIndex) {
        return personServiceImpl.findAll(pageSize, pageIndex);
    }

    //List basic persons
    @GetMapping("/basic/persons/{isDelete}/{pageSize}/{pageIndex}")
    public List<Person> basicPerson(@PathVariable("isDelete") Long isDelete,@PathVariable("pageSize") Long pageSize, @PathVariable("pageIndex") Long pageIndex) {
        return personServiceImpl.findBasic(isDelete,pageSize, pageIndex);
    }

    @GetMapping(value = "personbydate/{date}/{pageSize}/{pageIndex}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> findPersonByDate(@PathVariable("date") Date date, @PathVariable("pageSize") Long pageSize, @PathVariable("pageIndex") Long pageIndex){
        return personServiceImpl.findPersonByDate(date, pageSize, pageIndex);
    }

    @GetMapping(value = "symptomtable/{startDate}/{endDate}/{symptom}/{pageSize}/{pageIndex}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> findPersonBySymptom(@PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate, @PathVariable("symptom") Long id_symptom, @PathVariable("pageSize") Long pageSize, @PathVariable("pageIndex") Long pageIndex ){
        return personServiceImpl.findListPersonBySymptom(startDate, endDate, id_symptom, pageSize, pageIndex);
    }

    @GetMapping(value = "contacttable/{startDate}/{endDate}/{contact}/{pageSize}/{pageIndex}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> findPersonByContact(@PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate, @PathVariable("contact") Long id_contact,  @PathVariable("pageSize") Long pageSize, @PathVariable("pageIndex") Long pageIndex ){
        return personServiceImpl.findListPersonByContact(startDate, endDate, id_contact, pageSize, pageIndex);
    }

    @GetMapping(value = "/sumall" )
    public Long sumAll(){
       return personServiceImpl.sumAll();
    }

    @GetMapping(value = "/sumpersonbydate/{date}" )
    public Long sumPersonByDate(@PathVariable("date") Date date){
        return personServiceImpl.sumPersonByDare(date);
    }

    @GetMapping(value = "/sumpersonbysymptom/{startDate}/{endDate}/{id_symptom}")
    public Long sumPersonBySymptom(@PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate, @PathVariable("id_symptom") Long id_symptom) {
        return personServiceImpl.sumPersonBySymptom(startDate, endDate, id_symptom);
    }

    @GetMapping(value = "/sumpersonbycontact/{startDate}/{endDate}/{id_contact}")
    public Long sumPersonByContact(@PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate, @PathVariable("id_contact") Long id_contact) {
        return personServiceImpl.sumPersonBySymptom(startDate, endDate, id_contact);
    }

    @GetMapping(value = "/sumbasic/{isDelete}" )
    public Long sumBasic(@PathVariable("isDelete") Long isDelete){
        return personServiceImpl.sumBasic(isDelete);
    }

}

