package com.test.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.dao.EntryRepository;
import com.test.model.Entry;
import com.test.service.EntryService;
import com.test.exception.ResourceNotFoundException;

@Service
public class EntryServiceImpl implements EntryService {

    @Autowired
    private EntryRepository entryRepository;

    @Override
    public Entry saveEntry(Entry entry) {
        return entryRepository.save(entry);
    }

    @Override
    public Entry updateEntry(Long id, Entry entry) {
        Entry entryyy = entryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Entry not found with id: " + id));

        entryyy.setDate(entry.getDate());
        entryyy.setLocation(entry.getLocation());
        entryyy.setFarmerName(entry.getFarmerName());
        entryyy.setMobileNumber(entry.getMobileNumber());
        entryyy.setExpense(entry.getExpense());
        entryyy.setProfit(entry.getProfit()); // ✅ Corrected line with semicolon

        return entryRepository.save(entryyy);
    }

    @Override
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @Override
    public void deleteEntry(Long id) {
        Entry entry = entryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Entry not found with id: " + id));
        entryRepository.delete(entry);
    }

    @Override
    public Entry getEntryById(Long id) {
        return entryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Entry not found with id: " + id));
    }

	@Override
	public List<Entry> searchEntries(String keyword) {
		  return entryRepository.searchEntries(keyword);
    
	}
}
