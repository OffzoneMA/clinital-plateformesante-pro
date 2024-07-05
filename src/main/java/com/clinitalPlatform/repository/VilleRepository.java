package com.clinitalPlatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinitalPlatform.models.Ville;

@Repository
public interface VilleRepository extends JpaRepository<Ville, Long>{
	


}

