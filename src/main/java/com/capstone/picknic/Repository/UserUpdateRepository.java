package com.capstone.picknic.Repository;

import com.capstone.picknic.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserUpdateRepository extends JpaRepository<Users, Long> {
    Users findByLoginid(String loginid);
}
