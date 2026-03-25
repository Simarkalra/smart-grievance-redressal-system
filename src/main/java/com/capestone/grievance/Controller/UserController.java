package com.capestone.grievance.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.capestone.grievance.Entity.ChangePasswordRequest;
import com.capestone.grievance.Entity.Organization;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Repository.OrganizationRepository;
import com.capestone.grievance.Service.UserService;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

@Autowired
private OrganizationRepository organizationRepository;
   
    @Autowired
    private UserService userService;
    
     @PostMapping("/register")
    public User RegisterUser(@RequestBody User user){
        return userService.RegisterUser(user);
    }






@PostMapping("/create-organization")
public ResponseEntity<?> createOrganization(@RequestBody User user) {

    // 🔥 1. Create organization
    Organization org = new Organization();
    org.setName(user.getUsername() + "_org");

    organizationRepository.save(org);

    // 🔥 2. Create admin
    user.setRole("ADMIN");
    user.setOrganization(org);

    userService.RegisterUser(user);

    Map<String, Object> response = new HashMap<>();
response.put("message", "Organization created");
response.put("orgId", org.getId());

return ResponseEntity.ok(response);
}

@PostMapping("/register-with-org")
public ResponseEntity<?> registerUserWithOrg(
        @RequestParam Long orgId,
        @RequestBody User user) {

    Organization org = organizationRepository.findById(orgId)
            .orElseThrow(() -> new RuntimeException("Organization not found"));

    user.setOrganization(org);

    return ResponseEntity.ok(userService.RegisterUser(user));
}


@PostMapping("/change-password")
public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {

    User existingUser = userService.findByUsername(request.getUsername());

    if (existingUser == null) {
        return ResponseEntity.badRequest().body("User not found");
    }

    existingUser.setPassword(request.getPassword());
    userService.RegisterUser(existingUser);

    return ResponseEntity.ok("Password updated successfully");
}

@PostMapping("/login")
public User login(@RequestBody User user) {

    User existingUser = userService.findByUsername(user.getUsername());

    if (existingUser != null &&
        existingUser.getPassword().equals(user.getPassword())) {
        return existingUser;
    }

    throw new RuntimeException("Invalid credentials");
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
