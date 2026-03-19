package com.capestone.grievance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capestone.grievance.Entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
