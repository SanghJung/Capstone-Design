package com.capstone.picknic.Service;

import com.capstone.picknic.domain.Users;
import com.capstone.picknic.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
//유저디테일서비스
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override //login_id로 사용자 정보 가져오는 메서드
    public Users loadUserByUsername(String login_id){
        return userRepository.findByLoginId(login_id)
                .orElseThrow(() -> new IllegalArgumentException(login_id));
    }
}
