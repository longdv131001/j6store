package com.j6store.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.j6store.dao.OrderDAO;
import com.j6store.dao.OrderDetailDAO;
import com.j6store.entity.Order;
import com.j6store.entity.OrderDetail;
import com.j6store.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderDAO odao;
	@Autowired
	OrderDetailDAO ddao;
	@Override
	public Order create(JsonNode orderdata) {
		ObjectMapper mapper=new ObjectMapper();
		Order order=mapper.convertValue(orderdata,Order.class);
		odao.save(order);
		TypeReference<List<OrderDetail>> type=new TypeReference<List<OrderDetail>>() {};
		List<OrderDetail> details=mapper.convertValue(orderdata.get("orderDetails"),type)
				.stream().peek(d->d.setOrder(order)).collect(Collectors.toList());
		ddao.saveAll(details);
		return order;
	}
	@Override
	public Order findById(Long id) {
		// TODO Auto-generated method stub
		return odao.findById(id).get();
	}
	@Override
	public List<Order> findByUsername(String username) {
		// TODO Auto-generated method stub
		return odao.findByUsername(username);
	}




}
