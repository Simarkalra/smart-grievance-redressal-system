package com.capestone.grievance.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capestone.grievance.Entity.AssigneeType;
import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.KeywordRule;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Repository.AssigneeTypeRepository;
import com.capestone.grievance.Repository.CategoryRepository;
import com.capestone.grievance.Repository.KeywordRuleRepository;
import com.capestone.grievance.Repository.UserRepository;

@RestController
@RequestMapping("/admin")
public class AdminController {
    
@Autowired
public AssigneeTypeRepository assigneeTypeRepository;
@Autowired
public CategoryRepository categoryRepository;
@Autowired
public KeywordRuleRepository keywordRuleRepository;
@Autowired
public  UserRepository userRepository;
@PostMapping("/assignee-types")
    public AssigneeType createAssigneeType(@RequestBody AssigneeType type){
        return assigneeTypeRepository.save(type);
    }

    // Get departments
    @GetMapping("/assignee-types")
    public List<AssigneeType> getAssigneeTypes(){
        return assigneeTypeRepository.findAll();
    }

    @PostMapping("/users")
public User createUser(@RequestBody User user){
    return userRepository.save(user);
}

    // Create category
    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category category){
        return categoryRepository.save(category);
    }

    // Get categories
    @GetMapping("/categories")
    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    @PutMapping("/categories/{id}/assignee")
public Category updateCategoryAssignee(
        @PathVariable Long id,
        @RequestBody AssigneeType assigneeType){

    Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found"));

    category.setAssigneeType(assigneeType);

    return categoryRepository.save(category);
}

    // Create keyword rule
    @PostMapping("/rules")
    public KeywordRule createRule(@RequestBody KeywordRule rule){
        return keywordRuleRepository.save(rule);
    }

    // Get keyword rules
    @GetMapping("/rules")
    public List<KeywordRule> getRules(){
        return keywordRuleRepository.findAll();
    }
}
