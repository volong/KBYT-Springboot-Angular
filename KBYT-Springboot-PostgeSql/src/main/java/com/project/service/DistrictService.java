package com.project.service;

import com.project.model.District;
import com.project.model.Province;

import java.util.List;
import java.util.Optional;

public interface DistrictService {
    Optional<District> findById(String id);
    List<District> findAll();
    List<District> findAllByProvince(Province province);

}
