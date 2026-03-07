package com.capestone.grievance.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capestone.grievance.Controller.GrievanceController;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.Entity.Grievance;
import com.capestone.grievance.Repository.GrievanceRepository;

@Service
public class GrievanceService {

   @Autowired 
    public GrievanceRepository grievanceRepository;

    public Grievance RegisterGrievance(Grievance griev){
        griev.setStatus("PENDING");
        return grievanceRepository.save(griev);
    }

     public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    } 
    public  List<Grievance> getGrievanceByStudent(User Student){
        return grievanceRepository.findByStudent(Student);
    }

    public List<Grievance> getGrievanceByAssignee(User Assignee){
        return grievanceRepository.findByAssignee(Assignee);
    }


     public List<Grievance> getGrievanceBySupervisor(User Supervisor){
        return grievanceRepository.findBySupervisor(Supervisor);
        
     }


     public Grievance ResolveGrievance(Long id){
        Grievance grv= grievanceRepository.findById(id).orElseThrow();
        grv.setStatus("RESOLVED");
        return  grievanceRepository.save(grv);
     }

      public void deleteGrievance(Long grievanceId) {
        grievanceRepository.deleteById(grievanceId);
    }

    
    
    
}
