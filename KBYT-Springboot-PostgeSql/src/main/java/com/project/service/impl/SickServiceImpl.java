package com.project.service.impl;

import com.project.model.ListSick;
import com.project.model.ListSymptom;
import com.project.model.Sick;
import com.project.repository.SickRepository;
import com.project.service.SickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SickServiceImpl implements SickService {

    @Autowired
    private SickRepository sickRepository;

    @Override
    public Sick save(Sick sick) {
        sickRepository.save(sick);
        return sick;
    }

    @Override
    public Sick findById(Long id) {
        return sickRepository.findById(id).get();
    }

    @Override
    public List<Sick> findSicksByPersonId(@Param("id") Long id_person) {
        return sickRepository.findSicksByPersonId(id_person);
    }

    @Override
    public void saveSick(Long id_sick, Long id_person) {
        sickRepository.saveSick(id_sick, id_person);
    }

    @Override
    public void deleteSickByPerson(Long id_person) {
        sickRepository.deleteSickByPerson(id_person);
    }

    @Override
    public List<Map<Long, ListSick>> findSickByIdSick(Long id1, Long id2, Long id3, Long id4, Long id5, Long id6, Long id7, Long id8, Long id9, Long id10) {
       return sickRepository.findSickByIdSick(id1, id2, id3, id4, id5, id6, id7, id8, id9, id10);
    }
}
