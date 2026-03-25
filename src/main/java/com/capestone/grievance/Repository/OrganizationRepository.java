package com.capestone.grievance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.capestone.grievance.Entity.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
}