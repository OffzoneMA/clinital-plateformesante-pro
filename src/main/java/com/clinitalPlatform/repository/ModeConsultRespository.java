package com.clinitalPlatform.repository;

import com.clinitalPlatform.models.ModeConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeConsultRespository extends JpaRepository<ModeConsultation,Long> {

    @Query(value ="SELECT * FROM mode_consultation WHERE id_mode = :id",nativeQuery = true)
	ModeConsultation getById(Long id); 
}
