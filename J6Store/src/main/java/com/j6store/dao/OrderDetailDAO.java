package com.j6store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.j6store.entity.OrderDetail;

public interface OrderDetailDAO extends JpaRepository<OrderDetail, Long>{

}
