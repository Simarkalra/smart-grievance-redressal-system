package com.capestone.grievance.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.Organization;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ REGISTER USER
    public User registerUser(User user) {

        // Optional: prevent duplicate admin per organization
       // REMOVE THIS BLOCK

        return userRepository.save(user);
    }

    // ✅ FIND USER BY USERNAME + ORG
    public User findByUsernameAndOrganization(String username, Organization org) {
        List<User> users = userRepository.findByUsernameAndOrganization(username, org);
        return users.isEmpty() ? null : users.get(0);
    }

    // ✅ FIND USER BY USERNAME
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // ✅ GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    

 public void removeCategoryFromUser(Long userId, Long categoryId) {

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // 🔥 REMOVE USING ID MATCH (SAFE METHOD)
    user.getCategories().removeIf(c -> c.getId().equals(categoryId));

    userRepository.save(user);
}

    // ✅ GET USERS BY ORGANIZATION
    public List<User> getUsersByOrganization(Long orgId) {
        return userRepository.findByOrganizationId(orgId);
    }

    // ✅ DELETE USER
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ✅ UPDATE USER
    public User updateUser(User user) {
        return userRepository.save(user);
    }
}