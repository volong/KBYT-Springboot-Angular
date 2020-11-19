package com.project.service;

import com.project.model.District;
import com.project.model.Province;
import com.project.model.Ward;

import java.util.List;
import java.util.Optional;

public interface WardService {
    List<Ward> findAll();
    List<Ward> findAllByDistrict(District district);

}
