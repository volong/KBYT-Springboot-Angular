package com.project.service;

import com.project.model.ListSymptom;
import com.project.model.Symptom;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Map;

public interface SymptomService {
    Symptom save(Symptom symptom);

    Symptom findById(Long id);

    List<Symptom> findSymptomsByPersonId(@Param("id") Long id_person);

    List<Map<Long, ListSymptom>> findSymptomsByIdSymptom(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3, @Param("id4") Long id4, @Param("id5") Long id5, @Param("id6") Long id6);

    void saveSymptom(@Param("id_symptom") Long id_symptom, @Param("id_person") Long id_person);

    void deleteSymptomByPerson(@Param("id_person") Long id_person);
}
