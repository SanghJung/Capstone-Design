package com.capstone.picknic.service;

import com.capstone.picknic.domain.User;
import com.capstone.picknic.dto.UserDto;
import com.capstone.picknic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
//유저디테일서비스
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(UserDto userDto){
        userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        return userRepository.save(User.createUser(userDto)).getUserId();
    }

    @Override //login_id로 사용자 정보 가져오는 메서드
    public User loadUserByUsername(String loginId){
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(loginId));
    }
}
