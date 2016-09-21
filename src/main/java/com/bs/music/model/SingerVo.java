package com.bs.music.model;

/**
 * Created by wyn on 2016/5/7.
 */
public class SingerVo {
    private Integer singerId;
    private String singerName;
    private Integer areaId;
    private String  singerArea;
    private Integer search;

    public Integer getSingerId() {
        return singerId;
    }

    public void setSingerId(Integer singerId) {
        this.singerId = singerId;
    }

    public String getSingerName() {
        return singerName;
    }

    public void setSingerName(String singerName) {
        this.singerName = singerName;
    }

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public String getSingerArea() {
        return singerArea;
    }

    public void setSingerArea(String singerArea) {
        this.singerArea = singerArea;
    }

    public Integer getSearch() {
        return search;
    }

    public void setSearch(Integer search) {
        this.search = search;
    }
}
