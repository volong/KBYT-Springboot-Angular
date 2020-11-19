package com.project.service.impl;


import com.project.model.Interface.ISaticalContact;
import com.project.model.ListContact;
import com.project.repository.ContactListRepository;
import com.project.service.ContactListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;


@Service
@Transactional
public class ContactListServiceImpl implements ContactListService {
    @Autowired
    private ContactListRepository contactListRepository;

    @Override
    public Iterable<ListContact> findAll() {
        return contactListRepository.findAll();
    }

    @Override
    public ListContact findById(Long id) {
        return contactListRepository.findById(id).get();
    }

    @Override
    public List<ISaticalContact> countListContact(Date startDate, Date endDate) {
        return contactListRepository.countListContact(startDate, endDate);
    }
}
