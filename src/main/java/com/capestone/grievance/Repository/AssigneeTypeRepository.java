package com.capestone.grievance.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capestone.grievance.Entity.AssigneeType;

public interface AssigneeTypeRepository extends JpaRepository<AssigneeType, Long>{
    List<AssigneeType> findByOrganizationId(Long orgId);
}
