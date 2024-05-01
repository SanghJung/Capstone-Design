package com.capstone.picknic.repository;

import com.capstone.picknic.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLoginId(String loginId); //login_id 으로 사용자 정보 가져오기


}