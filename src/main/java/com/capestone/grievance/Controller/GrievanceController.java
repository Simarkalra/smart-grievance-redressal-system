package com.capestone.grievance.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capestone.grievance.Entity.Grievance;
import com.capestone.grievance.Repository.UserRepository;
import com.capestone.grievance.Service.GrievanceService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping({"/grievances", "/grievance"})
public class GrievanceController {
    @Autowired
    GrievanceService grievService;

    @Autowired
    private UserRepository userRep;

    @PostMapping
    public Grievance registerGrievance(@RequestBody Grievance griev) {
      return grievService.registerGrievance(griev);
    }

    // Compatibility path used by some frontend clients
    @PostMapping("/create")
    public Grievance createGrievance(@RequestBody Grievance griev) {
      return grievService.registerGrievance(griev);
    }

    @GetMapping("/{id}")
    public Grievance getGrievById(@PathVariable Long id) {
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

    @GetMapping("/assignee/{id}")
    public List<Grievance> getByAssignee(@PathVariable Long id) {
        return grievService.getByAssignee(id);
    }

    @DeleteMapping("/{grievanceId}")
    public void deleteGrievance(@PathVariable Long grievanceId) {
        grievService.deleteGrievance(grievanceId);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

}
