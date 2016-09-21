package com.bs.music.model;

import javax.persistence.*;

/**
 * Created by wyn on 2016/5/8.
 */
@Table(name = "singer_area")
public class Area {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
