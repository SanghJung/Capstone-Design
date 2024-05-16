package com.capstone.picknic.repository;

import com.capstone.picknic.domain.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    boolean existsByName(String name);

    Place findOneByName(String name);
}
