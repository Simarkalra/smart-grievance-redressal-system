package com.capestone.grievance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.KeywordRule;

public interface KeywordRuleRepository extends JpaRepository<KeywordRule, Long>{

    // 🔹 Existing
    List<KeywordRule> findByCategory(Category category);

    // 🔥 SORTED (important for UI)
    List<KeywordRule> findByOrganizationIdOrderByKeywordAsc(Long orgId);

    // 🔒 Prevent duplicate keywords
    boolean existsByKeywordAndOrganizationId(String keyword, Long orgId);
}