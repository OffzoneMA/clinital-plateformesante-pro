package com.clinitalPlatform.models;

import java.util.List;

import com.clinitalPlatform.enums.ModeConsultationEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity
@Table(name = "mode_consultation")
@Data
public class ModeConsultation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_mode;
    @Column(name = "mode_consultation")
	@Enumerated(EnumType.STRING)
	private ModeConsultationEnum mode;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "modeconsultation")
	@JsonIgnore
  	private List<MedecinSchedule> Schedules;
	
	
	public ModeConsultation() {
		super();
	}

	public ModeConsultation(ModeConsultationEnum mode) {
		super();
		this.mode = mode;
	}

}

    

