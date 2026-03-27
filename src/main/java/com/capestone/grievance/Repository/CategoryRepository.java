package com.capestone.grievance.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.capestone.grievance.Entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // 🔥 Sorted categories
    List<Category> findByOrganizationIdOrderByNameAsc(Long orgId);

    // 🔒 Prevent duplicate categories
    boolean existsByNameAndOrganizationId(String name, Long orgId);
}