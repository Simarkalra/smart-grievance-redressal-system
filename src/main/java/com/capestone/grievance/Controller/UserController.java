package com.capestone.grievance.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.capestone.grievance.Entity.User;

import com.capestone.grievance.Service.UserService;



@RestController
@RequestMapping("/user")
public class UserController {
   
    @Autowired
    private UserService userService;
    
     @PostMapping("/register")
    public User RegisterUser(@RequestBody User user){
        return userService.RegisterUser(user);
    }

  
 
 
   @GetMapping
    public List<User> getAllUsers(){
        return userService.GetAllUser();
    }

  

     @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable Long id){
        return userService.DeleteUser(id);
    }


}
