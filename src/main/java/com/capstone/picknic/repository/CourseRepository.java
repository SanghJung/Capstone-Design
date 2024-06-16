package com.capstone.picknic.repository;

import com.capstone.picknic.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
