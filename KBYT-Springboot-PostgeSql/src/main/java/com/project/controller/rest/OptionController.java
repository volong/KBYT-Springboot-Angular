package com.project.controller.rest;

import com.project.model.*;
import com.project.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class OptionController {

    @Autowired
    private SickListServiceImpl sickListServiceImpl;
    @Autowired
    private SymptomListServiceImpl symptomListServiceImpl;
    @Autowired
    private ContactListServiceImpl contactListServiceImpl;

    @Autowired
    private SickServiceImpl sickServiceImpl;
    @Autowired
    private SymptomServiceImpl symptomServiceImpl;
    @Autowired
    private ContactServiceImpl contactServiceImpl;

    @GetMapping("/list/sick")
    public List<ListSick> listSick() {
        return sickListServiceImpl.findAll();
    }

    @GetMapping("/list/contact")
    public Iterable<ListContact> listContact() {
        return contactListServiceImpl.findAll();
    }

    @GetMapping("/list/symptom")
    public Iterable<ListSymptom> listSymptom() {
        return symptomListServiceImpl.findAll();
    }

    @PostMapping("/sick")
    public Sick saveSick(@RequestBody Sick sick, UriComponentsBuilder uriComponentsBuilder) {
        return sickServiceImpl.save(sick);
    }

    @PostMapping("/contact")
    public Contact saveContact(@RequestBody Contact contact, UriComponentsBuilder uriComponentsBuilder) {
        return contactServiceImpl.save(contact);
    }

    @PostMapping("/symptom")
    public Symptom saveSymptom(@RequestBody Symptom symptom, UriComponentsBuilder uriComponentsBuilder) {
        return symptomServiceImpl.save(symptom);
    }

    @GetMapping(value = "/sick/{id_person}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Sick> findSicksByPersonId(@PathVariable("id_person") Long id_person) {
        return sickServiceImpl.findSicksByPersonId(id_person);
    }

    @GetMapping(value = "/contact/{id_person}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Contact> findContactsByPersonId(@PathVariable("id_person") Long id_person) {
        return contactServiceImpl.findContactsByPersonId(id_person);
    }

    @GetMapping(value = "/symptom/{id_person}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Symptom> findSymptomsByPersonId(@PathVariable("id_person") Long id_person) {
        return symptomServiceImpl.findSymptomsByPersonId(id_person);
    }
}
