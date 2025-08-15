package com.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.model.Entry;
import com.test.service.EntryService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class EntryController {

	
	
	@Autowired
	private EntryService entryService;
	
	@PostMapping("/post")
	public ResponseEntity<Entry> saveEntry(@RequestBody Entry entry) {
	    Entry savedEntry = entryService.saveEntry(entry);
	    return ResponseEntity.ok(savedEntry);
	}

	  
	  
	  @GetMapping("/get")
	    public ResponseEntity<List<Entry>> getAllEntries() {
	        List<Entry> entries = entryService.getAllEntries();
	        return ResponseEntity.ok(entries);
	    }
	  
	  
	  // Get a single entry by ID
	    @GetMapping("/{id}")
	    public ResponseEntity<Entry> getEntryById(@PathVariable Long id) {
	        Entry entry = entryService.getEntryById(id);
	        return ResponseEntity.ok(entry);
	    }
	    
	    
	    // Update entry by ID
	    @PutMapping("/{id}")
	    public ResponseEntity<Entry> updateEntry(@PathVariable Long id, @RequestBody Entry entry) {
	        Entry updatedEntry = entryService.updateEntry(id, entry);
	        return ResponseEntity.ok(updatedEntry);
	    }
	    
	    
	 // Delete entry by ID
	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteEntry(@PathVariable Long id) {
	        entryService.deleteEntry(id);
	        return ResponseEntity.ok("Entry deleted successfully with id: " + id);
	    }
	    
	    
	    
	    @GetMapping("/search")
	    public ResponseEntity<List<Entry>> searchEntries(@RequestBody String keyword) {
	        List<Entry> entries = entryService.searchEntries(keyword);
	        return ResponseEntity.ok(entries);
	    }

}
