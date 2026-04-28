package com.AML2A.JWT_DEMO.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.AML2A.JWT_DEMO.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}