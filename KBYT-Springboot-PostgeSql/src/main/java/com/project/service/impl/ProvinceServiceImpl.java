package com.project.service.impl;

import com.project.model.Province;
import com.project.repository.ProvinceRepository;
import com.project.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    private ProvinceRepository provinceRepository;

    @Override
    public Optional<Province> findById(String id) {
        return provinceRepository.findById(id);
    }

    @Override
    public List<Province> findAll() {
        return provinceRepository.findAll();
    }

}
