package com.capstone.picknic.service;

import com.capstone.picknic.repository.UserUpdateRepository;
import com.capstone.picknic.domain.User;
import com.capstone.picknic.repository.UserRepository;
import com.capstone.picknic.dto.UserDto;
import com.capstone.picknic.dto.UserUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
//유저디테일서비스 스프링 시큐리티에서 로그인을 진행할 때 사용자 정보 가져오기
public class UserService implements UserDetailsService {
    @Autowired
    private final UserRepository userRepository;
    private final UserUpdateRepository userUpdateRepository;




    @Override //login_id로 사용자 정보 가져오는 메서드(필수)
    public User loadUserByUsername(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(loginId));
    }

    public Long updateUser(UserUpdateDto userUpdateDto) {
        User user = userUpdateRepository.findByLoginId(userUpdateDto.getLoginId());
        user.updateNickname(userUpdateDto.getNickname());
        user.updatePassword(userUpdateDto.getPassword());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodePw = encoder.encode(userUpdateDto.getPassword());
        user.updatePassword(encodePw);

        userUpdateRepository.save(user);


        return user.getUserId();
    }

    public Long save(UserDto dto){   //회원 정보 추가 메서드
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        return userRepository.save(User.builder()
                .loginId(dto.getLoginId())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))//암호화
                .nickname(dto.getNickname())
                .build()).getUserId();//from Users

    }


}
