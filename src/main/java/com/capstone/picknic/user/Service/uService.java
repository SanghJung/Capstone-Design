package com.capstone.picknic.user.Service;

import com.capstone.picknic.user.Domain.Users;
import com.capstone.picknic.user.Dto.UserDto;
import com.capstone.picknic.user.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class uService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(UserDto userDto){
        return userRepository.save(Users.builder()
                .login_id(userDto.getLogin_id())
                .password(bCryptPasswordEncoder.encode(userDto.getPassword()))//암호화
                .build()).getUser_id();

    }
}
