package com.capestone.grievance.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capestone.grievance.Entity.AssigneeType;
import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Entity.KeywordRule;
import com.capestone.grievance.Entity.Organization;
import com.capestone.grievance.Repository.AssigneeTypeRepository;
import com.capestone.grievance.Repository.CategoryRepository;
import com.capestone.grievance.Repository.KeywordRuleRepository;
import com.capestone.grievance.Repository.OrganizationRepository;
import com.capestone.grievance.Repository.UserRepository;
import com.capestone.grievance.Service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AssigneeTypeRepository assigneeTypeRepository;

    @Autowired
    private KeywordRuleRepository keywordRuleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;   


    @GetMapping("/users")
public ResponseEntity<?> getUsers(@RequestParam Long orgId) {
    return ResponseEntity.ok(
        userService.getUsersByOrganization(orgId)
    );
}
@PutMapping("/assign-category")
public ResponseEntity<?> assignCategory(@RequestBody Map<String, String> req) {

    Long userId = Long.parseLong(req.get("userId"));
    Long categoryId = Long.parseLong(req.get("categoryId"));

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));

    List<Category> categories = user.getCategories();

    if (categories == null) {
        categories = new ArrayList<>();
    }

    // ✅ REMOVE DUPLICATES FIRST
    categories = categories.stream()
            .filter(c -> !c.getId().equals(categoryId))
            .collect(Collectors.toList());

    // ✅ ADD ONLY ONE INSTANCE
    categories.add(category);

    user.setCategories(categories);

    return ResponseEntity.ok(userRepository.save(user));
}

    // Get all assignee types
   @GetMapping("/assignee-types")
public ResponseEntity<?> getAssigneeTypes(@RequestParam Long orgId) {
    return ResponseEntity.ok(
        assigneeTypeRepository.findByOrganizationId(orgId)
    );

}
  @PostMapping("/rules")
public ResponseEntity<?> createKeywordRule(
        @RequestBody Map<String, String> request,
        @RequestParam Long orgId) {

    Organization org = organizationRepository.findById(orgId)
            .orElseThrow(() -> new RuntimeException("Organization not found"));

    String keyword = request.get("keyword").trim().toLowerCase();
    String priority = request.get("priority");

    if (keyword.isEmpty()) {
        throw new RuntimeException("Keyword cannot be empty");
    }

    // 🔒 Prevent duplicate
    if (keywordRuleRepository.existsByKeywordAndOrganizationId(keyword, orgId)) {
        throw new RuntimeException("Keyword already exists");
    }

    KeywordRule rule = new KeywordRule();
    rule.setKeyword(keyword);
    rule.setPriority(priority);
    rule.setOrganization(org);

    return ResponseEntity.ok(keywordRuleRepository.save(rule));
}
@PostMapping("/users")
public ResponseEntity<?> createUser(
        @RequestBody Map<String, String> req,
        @RequestParam Long orgId) {

    System.out.println("Incoming request: " + req); // ✅ DEBUG

    Organization org = organizationRepository.findById(orgId)
            .orElseThrow(() -> new RuntimeException("Org not found"));

    String categoryIdStr = req.get("categoryId");

    if (categoryIdStr == null || categoryIdStr.isEmpty()) {
        throw new RuntimeException("Category ID is missing");
    }

    Long categoryId = Long.parseLong(categoryIdStr);

    Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));

    User user = new User();
    user.setUsername(req.get("username"));
    user.setPassword(req.get("password"));
    user.setRole("STAFF");

    user.setOrganization(org);
    List<Category> categories = user.getCategories();

if (categories == null) {
    categories = new java.util.ArrayList<>();
}

categories.add(category);
user.setCategories(categories);// ✅ MUST WORK NOW

    return ResponseEntity.ok(userRepository.save(user));
}

@DeleteMapping("/remove-category")
public ResponseEntity<?> removeCategory(
        @RequestParam Long userId,
        @RequestParam Long categoryId
) {
    userService.removeCategoryFromUser(userId, categoryId);
    return ResponseEntity.ok("Category removed");
}

   

    // Get all keyword rules
    @GetMapping("/rules")
public ResponseEntity<?> getKeywordRules(@RequestParam Long orgId) {

    List<KeywordRule> rules = keywordRuleRepository.findByOrganizationIdOrderByKeywordAsc(orgId);

    return ResponseEntity.ok(rules);
}
}
