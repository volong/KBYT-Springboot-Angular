package com.project.service.impl;

import com.project.model.Interface.ISaticalSymptom;
import com.project.model.ListSymptom;
import com.project.repository.SymptomListRepository;
import com.project.service.SymptomListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;


@Service
@Transactional
public class SymptomListServiceImpl implements SymptomListService {

    @Autowired
    private SymptomListRepository symptomListRepository;

    @Override
    public Iterable<ListSymptom> findAll() {
        return symptomListRepository.findAll();
    }

    @Override
    public ListSymptom findById(Long id) {
        return symptomListRepository.findById(id).get();
    }

    @Override
    public List<ISaticalSymptom> countListSymptom(Date startDate, Date endDate) {
        return symptomListRepository.countListSymptom(startDate, endDate);
    }


}
