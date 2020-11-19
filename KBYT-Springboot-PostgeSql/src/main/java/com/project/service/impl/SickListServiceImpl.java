package com.project.service.impl;

import com.project.model.ListSick;
import com.project.repository.SickListRepository;
import com.project.service.SickListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SickListServiceImpl implements SickListService {

    @Autowired
    private SickListRepository sickListRepository;

    @Override
    public List<ListSick> findAll() {
        return sickListRepository.findAll();
    }

    @Override
    public ListSick findById(Long id) {
        return sickListRepository.findById(id).get();
    }
}
