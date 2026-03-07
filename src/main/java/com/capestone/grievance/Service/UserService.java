package com.capestone.grievance.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Repository.UserRepository;

@Service
public class UserService {
 
@Autowired
public  UserRepository UserRep;
 private static final Logger logger= Logger.getLogger(UserService.class.getName());
public User RegisterUser(User user){
    if(user.getRole()==null){
        user.setRole("STUDENT");
    }
    logger.info("Registering user:"+ user.getUsername()+ "with role:" + user.getRole());
    return UserRep.save(user);
}

public User AssignRole(Long id, String role){
 User  Optuser= UserRep.findById(id).orElseThrow(); 
  Optuser.setRole(role);
  logger.info("aasign user" + Optuser.getUsername()+ "with role" + Optuser.getRole());
  return UserRep.save(Optuser);
 
}

public Optional<User> ValidateUser(String username,String password){
Optional<User> useropt= ( (Optional<User>) UserRep.findByUsername(username)).filter(user-> user.getPassword().equals(password));
useropt.ifPresent(user-> logger.info("user:" + user.getUsername() + "with role:"+ user.getRole()));
return useropt;
}

public List<User> GetAllUser(){
    return UserRep.findAll();
}

public Optional<User> UpdateRole(Long id, String role){
    Optional<User> useropt= UserRep.findById(id);
    if(useropt.isPresent()){
        User user= useropt.get();
        user.setRole(role);
        UserRep.save(user);
          logger.info("Updated role for user: " + user.getUsername() + " to " + user.getRole());
    }
    return useropt;
}


public boolean DeleteUser(Long id){
    if(UserRep.existsById(id)){
        UserRep.deleteById(id);
       return true;
    }
    return false;
}
}
