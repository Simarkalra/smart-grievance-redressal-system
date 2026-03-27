package com.capestone.grievance.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capestone.grievance.Entity.Grievance;
import com.capestone.grievance.Service.GrievanceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceService grievService;

    @ExceptionHandler(Exception.class)
public ResponseEntity<String> handleAll(Exception ex) {
    ex.printStackTrace(); // 🔥 PRINT REAL ERROR
    return ResponseEntity.status(500).body(ex.getMessage());
}
    // ✅ Create grievance (MAIN API)
    @PostMapping
    public Grievance registerGrievance(
            @RequestBody Grievance griev,
            @RequestParam Long userId) {

        return grievService.registerGrievance(griev, userId);
    }



    // ✅ (Optional backward compatibility)
    @PostMapping("/create")
    public Grievance createGrievance(
            @RequestBody Grievance griev,
            @RequestParam Long userId) {

        return grievService.registerGrievance(griev, userId);
    }

    // ✅ Get grievances created by user (My Grievances)
    @GetMapping("/reported/{id}")
    public List<Grievance> getByReportedUser(@PathVariable Long id) {
        return grievService.getByReportedUser(id);
    }

    // ✅ Get grievances assigned to assignee
    @GetMapping("/assignee/{id}")
public List<Grievance> getByAssignee(
        @PathVariable Long id,
        @RequestParam Long orgId) {

    return grievService.getByAssignee(id, orgId);
}

    // ✅ Get all grievances
    @GetMapping
    public List<Grievance> getAllGrievances() {
        return grievService.getAllGrievances();
    }

    // ✅ Get grievance by id
    @GetMapping("/{id}")
    public Grievance getGrievById(@PathVariable Long id) {
        return grievService.getGrievanceById(id);
    }

    // ✅ Update status
    @PutMapping("/{id}/status")
    public Grievance updateStatus(
            @PathVariable Long id,
            @RequestParam Grievance.Status status) {

        return grievService.updateStatus(id, status);
    }

    // ✅ Resolve grievance
    @PutMapping("/{id}/resolve")
    public Grievance resolveGrievance(@PathVariable Long id) {
        return grievService.resolveGrievance(id);
    }

    // ✅ Delete grievance
    @DeleteMapping("/{grievanceId}")
    public void deleteGrievance(@PathVariable Long grievanceId) {
        grievService.deleteGrievance(grievanceId);
    }
@GetMapping("/test")
public String test() {
    return "Working";}

    // ✅ Exception handler
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}