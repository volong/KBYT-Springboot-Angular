package com.project.service;

import com.project.model.Province;

import java.util.List;
import java.util.Optional;


public interface ProvinceService {
    Optional<Province> findById(String id);
    List<Province> findAll();

}
