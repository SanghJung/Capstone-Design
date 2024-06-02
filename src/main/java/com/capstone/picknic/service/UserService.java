package com.capstone.picknic.service;

import com.capstone.picknic.domain.User;
import com.capstone.picknic.dto.UserDto;
import com.capstone.picknic.dto.UserUpdateDto;
import com.capstone.picknic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
//유저디테일서비스
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void checkDuplicatedLoginId(String loginId) {
        Optional<User> user = userRepository.findByLoginId(loginId);
        if(user.isPresent()) {throw new IllegalArgumentException("존재하는 아이디입니다.");}
    }

    public Optional<User> findByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId);
    }

    @Transactional
    public Long save(UserDto userDto){   //회원 정보 추가 메서드
        checkDuplicatedLoginId(userDto.getLoginId());
        userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        return userRepository.save(userDto.toEntity()).getUserId();
    }

    @Transactional
    public void update(UserUpdateDto userUpdateDto) {
        Optional<User> user = userRepository.findByLoginId(userUpdateDto.getLoginId());
        if(!user.get().checkDuplicatedPassword(userUpdateDto.getPassword())) {throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");}
        user.get().updatePassword(bCryptPasswordEncoder.encode(userUpdateDto.getNewPassword()));
    }

    @Override //login_id로 사용자 정보 가져오는 메서드
    public User loadUserByUsername(String loginId){
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(loginId));
    }


}