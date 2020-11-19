package com.project.service.impl;

import com.project.model.ListSymptom;
import com.project.model.Symptom;
import com.project.repository.SymptomRepository;
import com.project.service.SymptomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class SymptomServiceImpl implements SymptomService {

    @Autowired
    private SymptomRepository symptomRepository;

    @Override
    public Symptom save(Symptom symptom) {
        symptomRepository.save(symptom);
        return symptom;
    }

    @Override
    public Symptom findById(Long id) {
        return symptomRepository.findById(id).get();
    }

    @Override
    public List<Symptom> findSymptomsByPersonId(@Param("id") Long id_person) {
        return symptomRepository.findSymptomsByPersonId(id_person);
    }

    @Override
    public List<Map<Long, ListSymptom>> findSymptomsByIdSymptom(Long id1, Long id2, Long id3, Long id4, Long id5, Long id6) {
        return symptomRepository.findSymptomByIdSymptom(id1, id2, id3, id4, id5, id6);
    }


    @Override
    public void saveSymptom(Long id_symptom, Long id_person) {
        symptomRepository.saveSymptom(id_symptom, id_person);
    }

    @Override
    public void deleteSymptomByPerson(Long id_person) {
        symptomRepository.deleteSymptomByPerson(id_person);
    }
}
