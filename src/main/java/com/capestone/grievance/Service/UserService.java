package com.capestone.grievance.Service;

import java.util.List;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Repository.UserRepository;

@Service
public class UserService {
 
@Autowired
public  UserRepository UserRep;

public User RegisterUser(User user){
    return UserRep.save(user);
}





public List<User> GetAllUser(){
    return UserRep.findAll();
}


public boolean DeleteUser(Long id){
    if(UserRep.existsById(id)){
        UserRep.deleteById(id);
       return true;
    }
    return false;
}
}
