package com.capestone.grievance.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capestone.grievance.Entity.AssigneeType;
import com.capestone.grievance.Entity.Organization;
import com.capestone.grievance.Entity.User;

public interface UserRepository extends JpaRepository<User,Long>{

 
    User findFirstByRole(String role);
    User findByUsername(String username);
    public User findFirstByAssigneeType(AssigneeType assigneeType);

    public List<User> findByRole(String admin);
    User findByRoleAndOrganization(String string, Organization organization);
}
