package com.project.repository;

import com.project.model.District;
import com.project.model.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface WardRepository extends JpaRepository<Ward, String> {
    List<Ward> findAllByDistrict(District district);
}
