package com.capstone.picknic.Repository;

import com.capstone.picknic.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByLoginId(String login_id); //login_id 으로 사용자 정보 가져오기

}