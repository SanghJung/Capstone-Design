package com.capstone.picknic.Service;

import com.capstone.picknic.domain.Users;
import com.capstone.picknic.dto.UserDto;
import com.capstone.picknic.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class uService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(UserDto dto){   //회원 정보 추가 메서드
        return userRepository.save(Users.builder()
                .loginid(dto.getLoginid())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))//암호화
                .nickname(dto.getNickname())
                .build()).getUser_id();//from Users

    }
}
