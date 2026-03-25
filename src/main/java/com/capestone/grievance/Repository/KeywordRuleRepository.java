package com.capestone.grievance.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.KeywordRule;


public interface KeywordRuleRepository extends JpaRepository<KeywordRule, Long>{

    List<KeywordRule> findByCategory(Category category);

}
