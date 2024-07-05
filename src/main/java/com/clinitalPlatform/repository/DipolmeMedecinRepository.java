package com.clinitalPlatform.repository;

import com.clinitalPlatform.models.DiplomeMedecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DipolmeMedecinRepository extends JpaRepository<DiplomeMedecin,Long> {
    
}
