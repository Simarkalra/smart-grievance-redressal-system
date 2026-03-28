package com.capestone.grievance.Controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.Organization;
import com.capestone.grievance.Repository.CategoryRepository;
import com.capestone.grievance.Repository.OrganizationRepository;

@RestController
@RequestMapping("/admin/categories")

public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private OrganizationRepository organizationRepository;

    

@GetMapping
public List<Category> getCategories(@RequestParam Long orgId) {
    return categoryRepository.findByOrganizationIdOrderByNameAsc(orgId);
}

@PostMapping
public ResponseEntity<?> createCategory(
        @RequestBody Category category,
        @RequestParam Long orgId) {

    Organization org = organizationRepository.findById(orgId)
        .orElseThrow(() -> new RuntimeException("Organization not found"));

    String name = category.getName().trim().toLowerCase();

    if (name.isEmpty()) {
        throw new RuntimeException("Category cannot be empty");
    }

    // 🔒 Prevent duplicate
    if (categoryRepository.existsByNameAndOrganizationId(name, orgId)) {
        throw new RuntimeException("Category already exists");
    }

    category.setName(name);
    category.setOrganization(org);

    return ResponseEntity.ok(categoryRepository.save(category));
}
}