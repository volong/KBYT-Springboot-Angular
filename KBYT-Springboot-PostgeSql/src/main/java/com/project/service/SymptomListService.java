package com.project.service;


import com.project.model.Interface.ISaticalSymptom;
import com.project.model.ListSymptom;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface SymptomListService {
    Iterable<ListSymptom> findAll();

    ListSymptom findById(Long id);

    List<ISaticalSymptom> countListSymptom(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}