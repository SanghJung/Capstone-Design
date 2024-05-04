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



    public Long save(UserDto dto){   //회원 정보 추가 메서드
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        return userRepository.save(User.builder()
                .loginId(dto.getLoginId())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))//암호화
                .nickname(dto.getNickname())
                .build()).getUserId();//from Users

    }

    @Override //login_id로 사용자 정보 가져오는 메서드
    public User loadUserByUsername(String loginId){
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(loginId));
    }
}
