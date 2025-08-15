package com.test.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "entries")

@NoArgsConstructor
@AllArgsConstructor
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private String location;
    private String farmerName;
    private String mobileNumber;
    private Double expense;
    private Double profit;
    
    private Double SprayingArea;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getFarmerName() {
		return farmerName;
	}
	public void setFarmerName(String farmerName) {
		this.farmerName = farmerName;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public Double getSprayingArea() {
		return SprayingArea;
	}
	public void setSprayingArea(Double sprayingArea) {
		SprayingArea = sprayingArea;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public Double getExpense() {
		return expense;
	}
	public void setExpense(Double expense) {
		this.expense = expense;
	}
	public Double getProfit() {
		return profit;
	}
	public void setProfit(Double profit) {
		this.profit = profit;
	}
	@Override
	public String toString() {
		return "Entry [id=" + id + ", date=" + date + ", location=" + location + ", farmerName=" + farmerName
				+ ", mobileNumber=" + mobileNumber + ", expense=" + expense + ", profit=" + profit + ", SprayingArea="
				+ SprayingArea + "]";
	}

	


}
