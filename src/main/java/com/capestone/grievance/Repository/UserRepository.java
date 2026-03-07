package com.capestone.grievance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.capestone.grievance.Entity.User;

public interface UserRepository extends JpaRepository<User,Long>{

    public Object findByUsername(String username);
    
}
