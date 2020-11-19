package com.project.controller.rest;


import com.project.model.Interface.ISaticalContact;
import com.project.model.Interface.ISaticalPerson;
import com.project.model.Interface.ISaticalSymptom;
import com.project.model.Interface.impl.SaticalPerson;
import com.project.service.PersonService;
import com.project.service.SymptomListService;
import com.project.service.impl.ContactListServiceImpl;
import com.project.service.impl.PersonServiceImpl;
import com.project.service.impl.SymptomListServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class ChartController {

    @Autowired
    private SymptomListServiceImpl symptomListService;

    @Autowired
    private ContactListServiceImpl contactListService;

    @Autowired
    private PersonServiceImpl personService;

    @GetMapping("/countsymptom/{startDate}/{endDate}")
    public List<ISaticalSymptom> countSymptom(
            @PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate) {
        return symptomListService.countListSymptom(startDate, endDate);
    }

    @GetMapping("/countcontact/{startDate}/{endDate}")
    public List<ISaticalContact> countContact(
            @PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate) {
        return contactListService.countListContact(startDate, endDate);
    }

//    @GetMapping("/countperson/{startDate}/{endDate}")
//    public List<ISaticalPerson> countPersonByDate(
//            @PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate) {
//        return personService.countPersonByDate(startDate, endDate);
//    }

    @GetMapping("/countperson/{startDate}/{endDate}")
    public List<SaticalPerson> countPersonByDate(
            @PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate) {
        List<SaticalPerson> saticalPersonList = new ArrayList<>();
        for (LocalDate i = LocalDate.parse(startDate.toString()); i.isBefore(LocalDate.parse(endDate.toString()).plusDays(1)); i = i.plusDays(1)) {
            ISaticalPerson iSaticalPerson = personService.countPersonByDate(Date.valueOf(i));
            SaticalPerson saticalPerson = new SaticalPerson();
            if (iSaticalPerson == null) {
                saticalPerson.setCount(0);
                saticalPerson.setDate(Date.valueOf(i).toString());
            } else {
                saticalPerson.setDate(Date.valueOf(i).toString());
                saticalPerson.setCount(iSaticalPerson.getCount());
            }
            saticalPersonList.add(saticalPerson);
        }

        return saticalPersonList;
    }
}
