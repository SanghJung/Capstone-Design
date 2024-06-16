package com.capstone.picknic.jwt;

import com.capstone.picknic.dto.LoginDto;
import com.capstone.picknic.dto.UserDatailsDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;


@RequiredArgsConstructor
@Log4j2
/**
 * 로그인이 성공할때 TokenProvider에서 발급된 토큰을 return하는 함수와 실패했을떄 오류 함수
 */
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    /**
     * 로그인시에 유저의 로그인 정보 request를 기반으로 DB의 데이터와 검증하는 함수
     *
     * @param request
     * @param response
     * @return
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        LoginDto loginDto = new LoginDto();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginDto = objectMapper.readValue(messageBody, LoginDto.class);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String username = loginDto.getLoginId();
        String password = loginDto.getPassword();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password, null);
        return authenticationManager.authenticate(authenticationToken);

    }

    /**
     * 성공시 발급된 토큰을 헤더 "Authorization"에 넣고 response를 보냄
     * @param request
     * @param response
     * @param filterChain
     * @param authentication
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, Authentication authentication) {

        UserDatailsDto userDatailsDto = (UserDatailsDto) authentication.getPrincipal();
        String loginId = userDatailsDto.getUsername();

//        이 로직은 인가즉 권한을 가져오는 로직인데 우리는 권한 설정 X
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
//        GrantedAuthority auth = iterator.next();

        String token = tokenProvider.createJwt(loginId);

        response.addHeader("Authorization", "Bearer " + token);

        log.info("로그인 성공");
    }


    /**
     * 로그인 실패시 401에러 response
     * @param request
     * @param response
     * @param exception
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) {
        log.info("로그인 에러");
        response.setStatus(401);
    }
}
