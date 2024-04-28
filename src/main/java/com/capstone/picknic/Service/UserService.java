package com.capstone.picknic.Service;

import com.capstone.picknic.Repository.UserUpdateRepository;
import com.capstone.picknic.domain.Users;
import com.capstone.picknic.Repository.UserRepository;
import com.capstone.picknic.dto.UserDto;
import com.capstone.picknic.dto.UserUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
//유저디테일서비스 스프링 시큐리티에서 로그인을 진행할 때 사용자 정보 가져오기
public class UserService implements UserDetailsService {
    @Autowired
    private final UserRepository userRepository;
    private final UserUpdateRepository userUpdateRepository;




    @Override //login_id로 사용자 정보 가져오는 메서드(필수)
    public Users loadUserByUsername(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException(loginId));
    }

    public Long updateUser(UserUpdateDto userUpdateDto) {
        Users users = userUpdateRepository.findByLoginId(userUpdateDto.getLoginId());
        users.updateNickname(userUpdateDto.getNickname());
        users.updatePassword(userUpdateDto.getPassword());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodePw = encoder.encode(userUpdateDto.getPassword());
        users.updatePassword(encodePw);

        userUpdateRepository.save(users);


        return users.getUser_id();
    }

    public Long save(UserDto dto){   //회원 정보 추가 메서드
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        return userRepository.save(Users.builder()
                .loginId(dto.getLoginId())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))//암호화
                .nickname(dto.getNickname())
                .build()).getUser_id();//from Users

    }


}
