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
    private UserRepository userRepository;

    public User registerUser(User user) {

        if("ADMIN".equals(user.getRole())) {

            User existingAdmin = userRepository.findByRoleAndOrganization("ADMIN", user.getOrganization());

            if(existingAdmin != null) {
                throw new RuntimeException("Admin already exists for this organization!");
            }
        }

        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean deleteUser(Long id) {
        if(userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

}
