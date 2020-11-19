package com.project.service.impl;

import com.project.model.District;
import com.project.model.Ward;
import com.project.repository.WardRepository;
import com.project.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class WardServiceImpl implements WardService {

    @Autowired
    private WardRepository wardRepository;

    @Override
    public List<Ward> findAll() {
        return wardRepository.findAll();
    }

    @Override
    public List<Ward> findAllByDistrict(District district) {
        return wardRepository.findAllByDistrict(district);
    }


}
