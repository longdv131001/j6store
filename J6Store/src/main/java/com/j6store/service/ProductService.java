package com.j6store.service;

import java.util.List;
import com.j6store.entity.Product;

public interface ProductService {

	List<Product> findAll();

	Product findById(Integer id);

	List<Product> findByCategoryID(String string);

	Product create(Product product);

	Product update(Product product);

	void delete(Integer id);




}
