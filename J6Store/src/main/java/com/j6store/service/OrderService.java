package com.j6store.service;


import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.j6store.entity.Order;


public interface OrderService{

	Order create(JsonNode orderdata);

	Order findById(Long id);

	List<Order> findByUsername(String username);

}
