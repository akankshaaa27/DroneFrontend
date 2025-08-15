package com.test.service;

import java.util.List;

import com.test.model.Entry;

public interface EntryService {
	
	 Entry saveEntry(Entry entry);
	    Entry updateEntry(Long id, Entry entry);
	    List<Entry> getAllEntries();
	    void deleteEntry(Long id);
	    Entry getEntryById(Long id);
	
	    
	    List<Entry> searchEntries(String keyword);

}
