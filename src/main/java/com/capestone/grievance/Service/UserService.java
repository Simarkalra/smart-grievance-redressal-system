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

    if("ADMIN".equals(user.getRole())) {

        User existingAdmin = UserRep.findByRoleAndOrganization("ADMIN", user.getOrganization());

        if(existingAdmin != null) {
            throw new RuntimeException("Admin already exists for this organization!");
        }
    }

    return UserRep.save(user); 
}



public User findByUsername(String username) {
    return UserRep.findByUsername(username);
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

public User updateUser(User user){
    return UserRep.save(user);
}

}
