package com.capstone.picknic.repository;

import com.capstone.picknic.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserUpdateRepository extends JpaRepository<User, Long> {
    User findByLoginId(String loginId);
}
