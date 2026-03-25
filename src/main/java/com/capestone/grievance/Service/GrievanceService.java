package com.capestone.grievance.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.capestone.grievance.Entity.AssigneeType;
import com.capestone.grievance.Entity.Category;
import com.capestone.grievance.Entity.Grievance;
import com.capestone.grievance.Entity.KeywordRule;
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


    public List<Grievance> getByAssignee(Long assigneeId) {
    return grievanceRepository.findByAssigneeId(assigneeId);
}
    // Assign priority based on keyword
    private void assignPriority(Grievance grievance) {

    Category category = grievance.getCategory();
    String description = grievance.getDescription().toLowerCase();

    List<KeywordRule> rules = keywordRuleRepository.findByCategory(category);

    boolean match = false;

    for (KeywordRule rule : rules) {

        if (description.contains(rule.getKeyword().toLowerCase())) {

            grievance.setPriority(
                    Grievance.Priority.valueOf(rule.getPriority())
            );

            match = true;
            return;
        }
    }

    if (!match) {
        grievance.setPriority(Grievance.Priority.MEDIUM);
    }
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

    // Register new grievance
    public Grievance registerGrievance(Grievance grievance) {

    // Validate category
   if (grievance.getCategory() == null && 
    (grievance.getCustomTitle() == null || ((String) grievance.getCustomTitle()).isEmpty())) {
    throw new IllegalArgumentException("Either category or custom title is required");
}

    Category category = grievance.getCategory();
    Long categoryId = category.getId();

    if (category.getAssigneeType() == null && categoryId != null) {
        category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found for id=" + categoryId));
        grievance.setCategory(category);
    }

    if (category.getAssigneeType() == null) {
        throw new IllegalArgumentException("AssigneeType not set for category");
    }

    grievance.setCreatedAt(LocalDateTime.now());

    // Assign priority
    assignPriority(grievance);

    // Set SLA deadline
    setResolutionDeadline(grievance);

    grievance.setStatus(Grievance.Status.PENDING);
    

    // 🔥 AUTO ASSIGN
    AssigneeType assigneeType = category.getAssigneeType();

    if (assigneeType == null) {
        throw new IllegalArgumentException("AssigneeType not set for category");
    }

    User assignee = userRepository.findFirstByAssigneeType(assigneeType);

    if (assignee == null) {
        throw new IllegalArgumentException("No user found for this assignee type");
    }

    grievance.setAssignee(assignee);

    return grievanceRepository.save(grievance);
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