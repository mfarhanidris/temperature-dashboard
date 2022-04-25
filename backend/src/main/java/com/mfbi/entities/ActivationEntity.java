package com.mfbi.entities;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ActivationEntity implements PanacheRepository {

    @Id
    @GeneratedValue
    private Long id;
    public String username;
    public String key;

}
