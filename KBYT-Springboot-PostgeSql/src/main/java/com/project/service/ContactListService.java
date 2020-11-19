package com.project.service;


import com.project.model.Interface.ISaticalContact;
import com.project.model.ListContact;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface ContactListService {
    Iterable<ListContact> findAll();

    ListContact findById(Long id);

    List<ISaticalContact> countListContact(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
