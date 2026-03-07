package com.capestone.grievance.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capestone.grievance.Entity.Grievance;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Repository.UserRepository;
import com.capestone.grievance.Service.GrievanceService;


@RestController
@RequestMapping("/grievances")
public class GrievanceController {
    @Autowired
    GrievanceService grievService;
     @Autowired 
    public  UserRepository userRep;

    @PostMapping("/register")
    public Grievance RegisterGrievance(@RequestBody Grievance griev) {
      return grievService.RegisterGrievance(griev);
    }

    @GetMapping("/student/{studentId}")
public List<Grievance> getGrievByStudent(@PathVariable Long studentId){
   
    User student = userRep.findById(studentId).orElseThrow();
    return grievService.getGrievanceByStudent(student);
}


     @GetMapping
    public List<Grievance> getAllGrievances() {
        return grievService.getAllGrievances();
    }
     @GetMapping("/assignee/{assigneeId}")
    public  List<Grievance> getGrievByAssignee(@PathVariable Long assigneeId){
         User Assignee = userRep.findById(assigneeId).orElseThrow();
        return grievService.getGrievanceByAssignee(Assignee);
    }

     @GetMapping("/supervisor/{supervisorId}")
  
    public  List<Grievance> getGrievBySupervisor(@PathVariable Long supervisorId){
         User Supervisor = userRep.findById(supervisorId).orElseThrow();
        return grievService.getGrievanceBySupervisor(Supervisor);
    }

    @PutMapping("/resolve/{id}")
      public Grievance ResolveGrievance( @PathVariable Long id){
        return grievService.ResolveGrievance(id);
      }

     @DeleteMapping("/{grievanceId}")
     public void deleteGrievance(@PathVariable Long grievanceId) {
         grievService.deleteGrievance(grievanceId);
     }


}
