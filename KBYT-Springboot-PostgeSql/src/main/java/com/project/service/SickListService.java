package com.project.service;

import com.project.model.ListSick;

import java.util.List;

public interface SickListService {
    List<ListSick> findAll();

    ListSick findById(Long id);
}
