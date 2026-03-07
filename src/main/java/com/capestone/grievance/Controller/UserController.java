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

  
 @PutMapping("/{id}/assignrole")
public User AssignRole(@PathVariable Long id, @RequestParam String role){
    return userService.AssignRole(id, role);
}

   @PostMapping("/login")
public Optional<User> loginUser(@RequestBody User user){
    return userService.ValidateUser(user.getUsername(), user.getPassword());
}

   @GetMapping
    public List<User> getAllUsers(){
        return userService.GetAllUser();
    }

   @PutMapping("/{id}/role")
    public Optional<User> UpdateRole(@PathVariable Long id,@RequestParam String role){
        return  userService.UpdateRole(id,role);
    }

     @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable Long id){
        return userService.DeleteUser(id);
    }


}
