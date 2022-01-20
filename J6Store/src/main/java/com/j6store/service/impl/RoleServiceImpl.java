package com.j6store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.j6store.dao.RoleDAO;
import com.j6store.entity.Role;
import com.j6store.service.RoleService;
@Service
public class RoleServiceImpl implements RoleService{
	@Autowired
	RoleDAO dao;
	@Override
	public List<Role> findAll() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

}
