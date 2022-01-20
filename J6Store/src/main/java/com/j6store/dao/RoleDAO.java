package com.j6store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.j6store.entity.Role;

public interface RoleDAO extends JpaRepository<Role, String>{

	List<Role> findAll();

}
