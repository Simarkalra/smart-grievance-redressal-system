package com.capestone.grievance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capestone.grievance.Entity.AssigneeType;

public interface AssigneeTypeRepository extends JpaRepository<AssigneeType, Long>{
    
}
