package com.project.service.impl;

import com.project.model.District;
import com.project.model.Province;
import com.project.repository.DistrictRepository;
import com.project.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class DistrictServiceImpl implements DistrictService {
    @Autowired
    private DistrictRepository districtRepository;

    @Override
    public Optional<District> findById(String id) {
        return districtRepository.findById(id);
    }

    @Override
    public List<District> findAll() {
        return districtRepository.findAll();
    }

    @Override
    public List<District> findAllByProvince(Province province) {
        return districtRepository.findAllByProvince(province);
    }


}
