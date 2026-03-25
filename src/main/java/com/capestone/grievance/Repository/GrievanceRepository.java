package com.capestone.grievance.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capestone.grievance.Entity.Grievance;


public interface GrievanceRepository extends JpaRepository<Grievance, Long>{

    List<Grievance> findByAssigneeId(Long assigneeId);
    
}
