package com.capstone.picknic.Repository;

import com.capstone.picknic.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByLoginid(String loginid); //login_id 으로 사용자 정보 가져오기

}