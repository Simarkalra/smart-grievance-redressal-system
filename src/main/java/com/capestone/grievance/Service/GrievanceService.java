package com.capestone.grievance.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.capestone.grievance.Entity.AssigneeType;
import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.Grievance;
import com.capestone.grievance.Entity.KeywordRule;
import com.capestone.grievance.Entity.Organization;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Repository.CategoryRepository;
import com.capestone.grievance.Repository.GrievanceRepository;
import com.capestone.grievance.Repository.KeywordRuleRepository;
import com.capestone.grievance.Repository.UserRepository;

@Service
public class GrievanceService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private KeywordRuleRepository keywordRuleRepository;

    @Autowired
    private CategoryRepository categoryRepository;


public List<Grievance> getByAssignee(Long userId, Long orgId) {

    return grievanceRepository.findAll()
            .stream()
            .filter(g ->
                g.getAssignee() != null &&
                g.getAssignee().getId().equals(userId) &&
                g.getOrganization() != null &&
                g.getOrganization().getId().equals(orgId)
            )
            .toList();
}
   
private void assignPriority(Grievance grievance) {
    try {

        if (grievance.getDescription() == null) {
            grievance.setPriority(Grievance.Priority.LOW);
            return;
        }

        String desc = grievance.getDescription().toLowerCase();

        List<KeywordRule> rules = keywordRuleRepository.findAll();

        for (KeywordRule rule : rules) {

            if (desc.contains(rule.getKeyword().toLowerCase())) {

                try {
                    // 🔥 SAFE CONVERSION
                    String clean = rule.getPriority().trim().toUpperCase();

                    grievance.setPriority(
                        Grievance.Priority.valueOf(clean)
                    );

                } catch (Exception e) {
                    System.out.println("Invalid priority in DB: " + rule.getPriority());
                    grievance.setPriority(Grievance.Priority.LOW);
                }

                return;
            }
        }

        grievance.setPriority(Grievance.Priority.LOW);

    } catch (Exception e) {
        System.out.println("Priority error: " + e.getMessage());
        grievance.setPriority(Grievance.Priority.LOW);
    }
}


public List<Grievance> getByReportedUser(Long id) {
    return grievanceRepository.findByReportedById(id);
} 
    // Set SLA resolution deadline
    private void setResolutionDeadline(Grievance grievance) {

        Grievance.Priority priority = grievance.getPriority();

        if (priority == Grievance.Priority.HIGH) {
            grievance.setResolutionDeadline(LocalDateTime.now().plusHours(12));
        }

        else if (priority == Grievance.Priority.MEDIUM) {
            grievance.setResolutionDeadline(LocalDateTime.now().plusHours(24));
        }

        else if (priority == Grievance.Priority.LOW) {
            grievance.setResolutionDeadline(LocalDateTime.now().plusHours(48));
        }

        else if (priority == Grievance.Priority.CRITICAL) {
            grievance.setResolutionDeadline(LocalDateTime.now().plusHours(6));
        }
    }

    // Escalate priority when deadline passed
    private void escalatePriority(Grievance grievance) {

        Grievance.Priority priority = grievance.getPriority();

        if (priority == Grievance.Priority.LOW) {
            grievance.setPriority(Grievance.Priority.MEDIUM);
        }

        else if (priority == Grievance.Priority.MEDIUM) {
            grievance.setPriority(Grievance.Priority.HIGH);
        }

        else if (priority == Grievance.Priority.HIGH) {
            grievance.setPriority(Grievance.Priority.CRITICAL);
        }

        setResolutionDeadline(grievance);
    }

    // Scheduler checks overdue grievances
    @Scheduled(fixedRate = 60000)
    public void checkOverdueResolution() {

        List<Grievance> grievances = grievanceRepository.findAll();

        for (Grievance grievance : grievances) {

            if (grievance.getStatus() == Grievance.Status.PENDING
                    && grievance.getResolutionDeadline() != null
                    && grievance.getResolutionDeadline().isBefore(LocalDateTime.now())) {

                escalatePriority(grievance);
                grievanceRepository.save(grievance);
            }
        }
    }

public Grievance registerGrievance(Grievance grievance, Long userId) {

    try {
        // ✅ 1. Get reporter
    

       

        Category category = categoryRepository.findById(grievance.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        grievance.setCategory(category);

       User reporter = userRepository.findById(userId)
    .orElseThrow(() -> new RuntimeException("User not found"));

grievance.setUser(reporter);
grievance.setOrganization(reporter.getOrganization());

// 3. Find staff
List<User> users = userRepository
    .findByCategoriesContainingAndOrganizationId(
        category,
        reporter.getOrganization().getId()
    );

System.out.println("Users found: " + users.size());

// 4. ASSIGN STAFF (VERY IMPORTANT)
if (!users.isEmpty()) {
    grievance.setAssignee(users.get(0));  // ✅ THIS LINE FIXES YOUR ISSUE
} else {
    System.out.println("No staff found for this category");
}

// 5. Save
return grievanceRepository.save(grievance);

    } catch (Exception e) {
        e.printStackTrace(); // 🔥 THIS WILL SHOW REAL ERROR
        throw e;
    }
}
    // Get all grievances
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    // Get grievance by id
    public Grievance getGrievanceById(Long id) {

        return grievanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));
    }

    

    // Update status manually
    public Grievance updateStatus(Long id, Grievance.Status status) {

        Grievance grievance = grievanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        grievance.setStatus(status);

        return grievanceRepository.save(grievance);
    }

    // Resolve grievance
    public Grievance resolveGrievance(Long grievanceId) {

        Grievance grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        grievance.setStatus(Grievance.Status.RESOLVED);

        return grievanceRepository.save(grievance);
    }

    // Delete grievance
    public void deleteGrievance(Long grievanceId) {
        grievanceRepository.deleteById(grievanceId);

    }
}