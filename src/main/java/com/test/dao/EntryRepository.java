package com.test.dao;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.test.model.Entry;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
	
	 @Query("SELECT e FROM Entry e WHERE " +
	           "LOWER(e.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	           "LOWER(e.farmerName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	           "e.mobileNumber LIKE CONCAT('%', :keyword, '%') OR " +
	           "CAST(e.date AS string) LIKE CONCAT('%', :keyword, '%') OR " +
	           "CAST(e.expense AS string) LIKE CONCAT('%', :keyword, '%') OR " +
	           "CAST(e.profit AS string) LIKE CONCAT('%', :keyword, '%')")
	    List<Entry> searchEntries(@Param("keyword") String keyword);

}
