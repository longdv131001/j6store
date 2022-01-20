package com.j6store.rest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.j6store.entity.Authority;
import com.j6store.service.AuthorityService;


@CrossOrigin("*")
@RestController
@RequestMapping("/rest/authorities")
public class AuthoritiesRestController {
	 @Autowired
	    private AuthorityService authorityService;

	    @GetMapping
	    public List<Authority> findAll(@RequestParam("admin") Optional<Boolean> admin) {
	        if (admin.orElse(false)) {
	            return authorityService.findAuthoritiesOfAdminstrators();
	        }
	        return authorityService.findAll();
	    }

	    @PostMapping
	    public Authority save(@RequestBody Authority authority) {
	        return authorityService.create(authority);
	    }
	    @DeleteMapping("{id}")
	    public void delete(@PathVariable("id") Integer id) {
	        authorityService.delete(id);
	    }
}
