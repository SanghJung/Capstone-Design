package com.capstone.picknic.jwt;

import com.capstone.picknic.domain.User;
import com.capstone.picknic.dto.UserDatailsDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    /**
     * repuest, response이 올때 헤더를 검증하는 함수
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader("Authorization"); //request 헤더 에서 "Authorization"가져옴

        //헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) { //토큰이 없거나 형식이 맞지 않으면
            log.info("token is null");
            filterChain.doFilter(request, response);  //다음 필터로 넘기는 함수
            return;
        }

        String token = authorization.split(" ")[1];

        //유효기간 검사
        if(tokenProvider.isExpired(token)) {
            log.info("token expired");
            filterChain.doFilter(request,response);
        }

        User user = User.builder()
                .loginId(tokenProvider.getUsername(token))
                .password("tmppassword")
                .build();


        // statless 세션 생성
        UserDatailsDto userDatailsDto = new UserDatailsDto(user);

        Authentication authToken = new UsernamePasswordAuthenticationToken(userDatailsDto, null, userDatailsDto.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request,response);


    }

}
