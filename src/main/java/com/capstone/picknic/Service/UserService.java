package com.capstone.picknic.Service;

import com.capstone.picknic.domain.Users;
import com.capstone.picknic.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
//유저디테일서비스 스프링 시큐리티에서 로그인을 진행할 때 사용자 정보 가져오기
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    @Override //login_id로 사용자 정보 가져오는 메서드(필수)
    public Users loadUserByUsername(String loginid){
        return userRepository.findByLoginid(loginid)
                .orElseThrow(() -> new IllegalArgumentException(loginid));
    }
}
