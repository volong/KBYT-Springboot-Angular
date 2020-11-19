package com.project.repository;

import com.project.model.ListSick;
import com.project.model.ListSymptom;
import com.project.model.Sick;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface SickRepository extends PagingAndSortingRepository<Sick, Long> {
    @Query(value="SELECT * FROM sick INNER JOIN listsick ON sick.id_sick = listsick.id_sick WHERE id_person = :id",nativeQuery=true)
    List<Sick> findSicksByPersonId(@Param("id") Long id_person);

    @Modifying
    @Query(value="INSERT INTO sick (id_sick, id_person) VALUES (:id_sick, :id_person)", nativeQuery = true)
    void saveSick(@Param("id_sick") Long id_sick, @Param("id_person") Long id_person);

    @Modifying
    @Query(value="DELETE  FROM sick WHERE id_person = :id_person", nativeQuery = true)
    void deleteSickByPerson(@Param("id_person") Long id_person);

    @Query(value="SELECT * FROM listSick WHERE id_sick <> :id1 and id_sick <> :id2 and id_sick <> :id3 and id_sick <> :id4 and id_sick <> :id5 and id_sick <> :id6 and id_sick <> :id7 and id_sick <> :id8 and id_sick <> :id9 and id_sick <> :id10 ",nativeQuery=true)
    List<Map<Long, ListSick>> findSickByIdSick(@Param("id1") Long id1, @Param("id2") Long id2, @Param("id3") Long id3, @Param("id4") Long id4, @Param("id5") Long id5, @Param("id6") Long id6, @Param("id7") Long id7,@Param("id8") Long id8, @Param("id9") Long id9, @Param("id10") Long id10);

}

