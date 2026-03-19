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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capestone.grievance.Entity.Grievance;
import com.capestone.grievance.Entity.User;
import com.capestone.grievance.GrievanceApplication;
import com.capestone.grievance.Repository.GrievanceRepository;
import com.capestone.grievance.Repository.UserRepository;
import com.capestone.grievance.Service.GrievanceService;


@RestController
@RequestMapping("/grievances")
public class GrievanceController {
    @Autowired
    GrievanceService grievService;
     @Autowired 
    public  UserRepository userRep;

    @PostMapping
    public Grievance RegisterGrievance(@RequestBody Grievance griev) {
      return grievService.registerGrievance(griev);
    }

    @GetMapping("/{id}")
public Grievance getGrievById(@PathVariable Long id){
    User student = userRep.findById(id).orElseThrow();
    return grievService.getGrievanceById(id);
}

@PutMapping("/{id}/status")
    public Grievance updateStatus(
            @PathVariable Long id,
            @RequestParam Grievance.Status status) {

        return grievService.updateStatus(id, status);
    }

    @PutMapping("/{id}/resolve")
    public Grievance resolveGrievance(@PathVariable Long id) {
        return grievService.resolveGrievance(id);
    }


     @GetMapping
    public List<Grievance> getAllGrievances() {
        return grievService.getAllGrievances();
    }
    

    


    @PutMapping("/resolve/{id}")
      public Grievance ResolveGrievance( @PathVariable Long id){
        return grievService.resolveGrievance(id);
      }

     @DeleteMapping("/{grievanceId}")
     public void deleteGrievance(@PathVariable Long grievanceId) {
         grievService.deleteGrievance(grievanceId);
     }


}
