package com.j6store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.j6store.entity.Category;

public interface CategoryDAO extends JpaRepository<Category, String>{

}
