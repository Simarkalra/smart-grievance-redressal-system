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
import com.capestone.grievance.Entity.AssigneeType;
import com.capestone.grievance.Repository.OrganizationRepository;
import com.capestone.grievance.Repository.AssigneeTypeRepository;
import com.capestone.grievance.Service.UserService;



@RestController

@RequestMapping("/user")
public class UserController {

@Autowired
private OrganizationRepository organizationRepository;

@Autowired
private AssigneeTypeRepository assigneeTypeRepository;
   
    @Autowired
    private UserService userService;
    
@PostMapping("/register")
    public User RegisterUser(@RequestBody User user){
        return userService.registerUser(user);
    }




@PostMapping("/create-organization")
public ResponseEntity<?> createOrganization(@RequestBody Map<String, String> request) {

    String orgName = request.get("name");

    Organization org = new Organization();
    org.setName(orgName);
    organizationRepository.save(org);

    // Create admin user for this organization
    String adminUsername = "admin_" + org.getId();
    String adminPassword = "admin123"; // Default password
    
    User adminUser = new User();
    adminUser.setUsername(adminUsername);
    adminUser.setPassword(adminPassword);
    adminUser.setRole("ADMIN");
    adminUser.setOrganization(org);
    userService.registerUser(adminUser);

    // Return response in expected format
    Map<String, Object> response = new HashMap<>();
    response.put("orgId", org.getId());
    response.put("adminUsername", adminUsername);
    response.put("adminPassword", adminPassword);
    response.put("organizationName", org.getName());
    
   return ResponseEntity.ok(response);
}

@PostMapping("/register-with-org")
public ResponseEntity<?> registerUserWithOrg(
        @RequestParam Long orgId,
        @RequestBody User user) {

    Optional<Organization> orgOpt = organizationRepository.findById(orgId);
    if (!orgOpt.isPresent()) {
        return ResponseEntity.status(400).body("Organization not found");
    }
    Organization org = orgOpt.get();

    User existingUser = userService.findByUsernameAndOrganization(user.getUsername(), org);
    if (existingUser != null) {
        return ResponseEntity.status(400).body("Username already exists in this organization");
    }

    user.setOrganization(org);

    return ResponseEntity.ok(userService.registerUser(user));
}


@PostMapping("/change-password")
public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {

    if (request.getOrganizationId() == null) {
        return ResponseEntity.badRequest().body("Organization ID is required");
    }

    Optional<Organization> orgOpt = organizationRepository.findById(request.getOrganizationId());
    if (!orgOpt.isPresent()) {
        return ResponseEntity.status(401).body("Organization not found");
    }

    User existingUser = userService.findByUsernameAndOrganization(request.getUsername(), orgOpt.get());

    if (existingUser == null) {
        return ResponseEntity.status(404).body("User not found in this organization");
    }

    if (!existingUser.getPassword().equals(request.getOldPassword())) {
        return ResponseEntity.status(401).body("Incorrect current password");
    }

    existingUser.setPassword(request.getNewPassword());
    userService.updateUser(existingUser);

    return ResponseEntity.ok("Password updated successfully");
}

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
    String username = request.get("username");
String password = request.get("password");
String orgIdStr = request.get("organizationId");
Long orgId;

try {
    orgId = Long.parseLong(orgIdStr);
} catch (Exception e) {
    return ResponseEntity.status(400).body("Invalid organization ID");
}

    

    // ✅ FIX: fetch user WITH org gracefully
    Optional<Organization> orgOpt = organizationRepository.findById(orgId);
    if (!orgOpt.isPresent()) {
        return ResponseEntity.status(401).body("Organization not found");
    }
    Organization org = orgOpt.get();

    User existingUser = userService.findByUsernameAndOrganization(username, org);

    if (existingUser == null) {
        return ResponseEntity.status(401).body("User not found in this organization");
    }

    if (!existingUser.getPassword().equals(password)) {
        return ResponseEntity.status(401).body("Invalid password");
    }

    // ✅ Response
    Map<String, Object> response = new HashMap<>();
    response.put("id", existingUser.getId());
    response.put("username", existingUser.getUsername());
    response.put("role", existingUser.getRole());
    response.put("organizationId", org.getId());
    response.put("organizationName", org.getName());

    return ResponseEntity.ok(response);
}
 
    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }

}
