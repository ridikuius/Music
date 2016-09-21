package com.bs.music.model;

import javax.persistence.*;

/**
 * Created by wyn on 2016/5/7.
 */
@Table(name = "singer")
public class Singer {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 名称
     */
    private String name;

    /**
     * 性别
     */
    private String sex;

    /**
     * 地区
     */
    private Integer area;

    /**
     * 头像
     */
    private String protait;

    /**
     * 搜索次数
     */
    private Integer search;

    public String getProtait() {
        return protait;
    }

    public void setProtait(String protait) {
        this.protait = protait;
    }

    public Integer getSearch() {
        return search;
    }

    public void setSearch(Integer search) {
        this.search = search;
    }

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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }
}
