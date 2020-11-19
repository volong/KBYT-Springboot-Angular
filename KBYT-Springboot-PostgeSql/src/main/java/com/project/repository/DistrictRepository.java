package com.project.repository;

import com.project.model.District;
import com.project.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface DistrictRepository extends JpaRepository<District, String> {
    List<District> findAllByProvince(Province province);
}