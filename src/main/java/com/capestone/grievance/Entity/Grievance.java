package com.capestone.grievance.Entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Grievance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime resolutionDeadline;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private String customTitle;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // ✅ KEEP ONLY THIS (FINAL)
    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

  

    public Grievance() {}

    // ===== GETTERS =====

    public Long getId() { return id; }

    public String getDescription() { return description; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public LocalDateTime getResolutionDeadline() { return resolutionDeadline; }

    public Priority getPriority() { return priority; }

    public Status getStatus() { return status; }

    public Category getCategory() { return category; }

    public User getReportedBy() { return reportedBy; }

    public User getAssignee() { return assignee; }

    public String getCustomTitle() { return customTitle; }

    public Organization getOrganization() { return organization; }

    // ===== SETTERS =====

    public void setId(Long id) { this.id = id; }

    public void setDescription(String description) { this.description = description; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public void setResolutionDeadline(LocalDateTime resolutionDeadline) { this.resolutionDeadline = resolutionDeadline; }

    public void setPriority(Priority priority) { this.priority = priority; }

    public void setStatus(Status status) { this.status = status; }

    public void setCategory(Category category) { this.category = category; }

    public void setReportedBy(User reportedBy) { this.reportedBy = reportedBy; }

    public void setAssignee(User assignee) { this.assignee = assignee; }

    public void setCustomTitle(String customTitle) { this.customTitle = customTitle; }

    public void setOrganization(Organization organization) { this.organization = organization; }

    public void setUser(User reporter) {
        this.reportedBy = reporter;
    }

    // ===== ENUMS =====

    public enum Status {
        PENDING,
        IN_PROGRESS,
        RESOLVED,
        REJECTED
    }

    public enum Priority {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }
}