package com.capestone.grievance.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capestone.grievance.Entity.AssigneeType;
import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.Organization;
import com.capestone.grievance.Entity.User;



public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByAssigneeType(AssigneeType assigneeType);

    User findByUsername(String username);
    List<User> findByCategoriesContainingAndOrganizationId(Category category, Long orgId);

    User findByUsernameAndOrganization(String username, Organization organization);

    List<User> findByOrganizationId(Long orgId);

 @Query("SELECT u FROM User u JOIN u.categories c WHERE c.id = :categoryId")
List<User> findUsersByCategoryId(@Param("categoryId") Long categoryId);

    List<User> findByRole(String role);

    User findByRoleAndOrganization(String role, Organization organization);

    List<User> findByCategoriesContaining(Category category);
}