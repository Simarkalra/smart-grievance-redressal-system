package com.capestone.grievance.Entity;
import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity



public class Grievance{
@Id
 @GeneratedValue(strategy=GenerationType.IDENTITY)
    private  Long id;
    private String category;
    private String description;



    private String  status;  // submittted, in-progress , resolved
    private String priority; //high, medium, low

 @ManyToOne
  @JoinColumn(name="student_id")
    private User student;
     @ManyToOne
      @JoinColumn(name="assignee_id")
    private User assignee;
     @ManyToOne
      @JoinColumn(name="supervisor_id")
    private User supervisor;

   public String getStatus(){
        return status;
    }

    public void setStatus(String status){
       this.status=status;
    }

    
   public User getStudent() {
        return student;
    }

  public void setStudent(User student) {
        this.student = student;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public User getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(User supervisor) {
        this.supervisor = supervisor;
    }
}