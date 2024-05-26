package com.capstone.picknic.repository;

import com.capstone.picknic.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    boolean existsByName(String name);
}
