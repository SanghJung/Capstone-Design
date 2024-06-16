package com.capstone.picknic.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class TokenProvider {


    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; //토큰 지속시간

    private final SecretKey secretKey; //jwt 비밀키

    /**
     * yml파일에 정의된 jwtKey를 byte로 변환시킨 후 HS512알고리즘으로 암호화
     * @param jwtKey
     */
    public TokenProvider(@Value("${jwt-key}") String jwtKey) {
        secretKey = new SecretKeySpec(jwtKey.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS512.key().build().getAlgorithm());
    }

    /**
     * JWT에 저장되어있는 사용자 이름 가져오는 함수
     * @param token
     * @return
     */
    public String getUsername(String token) {
        return  Jwts.parser().verifyWith(secretKey).build()
                .parseSignedClaims(token)
                .getPayload()
                .get("loginId",String.class);
    }

    /**
     * JWT의 유효시간을 체크하는 함수
     * @param token
     * @return
     */
    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }

    /**\
     * JWT를 생성하는 함수
     * @param loginId
     * @return
     */
    public String createJwt(String loginId) {
        return Jwts.builder()
                .claim("loginId", loginId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME))
                .signWith(secretKey)
                .compact();
    }
}
