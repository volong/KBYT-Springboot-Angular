package com.project.repository;

import com.project.model.Interface.ISaticalSymptom;
import com.project.model.ListSymptom;
import com.project.model.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public interface SymptomListRepository extends PagingAndSortingRepository<ListSymptom, Long> {
    @Query(value=" SELECT count(*) as count,listsymptom.symptom as listSymptom, listsymptom.id_symptom as symptomId FROM symptom inner join listsymptom on symptom.id_symptom=listsymptom.id_symptom inner join person on symptom.id_person = person.id_person WHERE declared = 1 and is_delete = 0 and person.date >= :startDate AND person.date <= :endDate group by listsymptom.symptom, listsymptom.id_symptom;", nativeQuery = true)
    List<ISaticalSymptom> countListSymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
