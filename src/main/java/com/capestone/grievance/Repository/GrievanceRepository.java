package com.capestone.grievance.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.capestone.grievance.Entity.Grievance;


public interface GrievanceRepository extends JpaRepository<Grievance, Long>{

    
    
}
