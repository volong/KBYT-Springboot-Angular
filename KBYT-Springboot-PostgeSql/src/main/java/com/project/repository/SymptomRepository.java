package com.project.repository;

import com.project.model.ListSymptom;
import com.project.model.Symptom;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface SymptomRepository extends PagingAndSortingRepository<Symptom, Long> {
    @Query(value="SELECT * FROM symptom INNER JOIN listsymptom ON symptom.id_symptom = listsymptom.id_symptom WHERE id_person = :id",nativeQuery=true)
    List<Symptom> findSymptomsByPersonId(@Param("id") Long id_person);

    @Query(value="SELECT * FROM listSymptom WHERE id_symptom <> :id1 and id_symptom <> :id2 and id_symptom <> :id3 and id_symptom <> :id4 and id_symptom <> :id5 and id_symptom <> :id6 ",nativeQuery=true)
    List<Map<Long, ListSymptom>> findSymptomByIdSymptom(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3, @Param("id4") Long id4, @Param("id5") Long id5, @Param("id6") Long id6);

    @Modifying
    @Query(value="INSERT INTO symptom (id_symptom, id_person) VALUES (:id_symptom, :id_person)", nativeQuery = true)
    void saveSymptom(@Param("id_symptom") Long id_symptom, @Param("id_person") Long id_person);

    @Modifying
    @Query(value="DELETE  FROM symptom WHERE id_person = :id_person", nativeQuery = true)
    void deleteSymptomByPerson(@Param("id_person") Long id_person);

}
