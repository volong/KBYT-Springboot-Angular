package com.project.service;

import com.project.model.ListSick;
import com.project.model.ListSymptom;
import com.project.model.Sick;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface SickService {
    Sick save(Sick sick);

    Sick findById(Long id);

    List<Sick> findSicksByPersonId(@Param("id") Long id_person);

    void saveSick(@Param("id_sick") Long id_sick, @Param("id_person") Long id_person);

    void deleteSickByPerson(@Param("id_person") Long id_person);

     List<Map<Long, ListSick>> findSickByIdSick(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3, @Param("id4") Long id4, @Param("id5") Long id5, @Param("id6") Long id6, @Param("id7") Long id7, @Param("id8") Long id8, @Param("id9") Long id9, @Param("id10") Long id10);

}
