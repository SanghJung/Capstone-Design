package com.capstone.picknic.Controller;

import ch.qos.logback.core.model.Model;
import com.capstone.picknic.Repository.UserRepository;
import com.capstone.picknic.Service.UserService;
import com.capstone.picknic.domain.Users;
import com.capstone.picknic.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;

//회원가입 요청을 받으면 서비스 메서드를 사용해 사용자 저장, 로그인 페이지로 넘어가도록
@RequiredArgsConstructor
@Controller
public class UserApiController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/user") //회원가입 시 다시 로그인 페이지로 넘어가는 컨트롤러
    public String signup(UserDto request){
        userService.save(request);
        return "redirect:/login";
    }

    /*@GetMapping("/update")
    public String update(Principal principal, Model model){
        Users loginId =  UserRepository.findByLoginid(loginid);
        model.addAttribute("users", loginid);
    }
*/


    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @GetMapping("/signup")
    public String signup(){
        return "signup";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){

        new SecurityContextLogoutHandler().logout(request,response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/login";
    }


}
