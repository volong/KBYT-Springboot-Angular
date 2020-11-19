package com.project.repository;

import com.project.model.ListSick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface SickListRepository extends JpaRepository<ListSick, Long> {
}
