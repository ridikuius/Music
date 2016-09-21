package com.bs.music.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by wyn on 2016/5/7.
 */
@Table(name = "collect")
public class Collect {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 外键，收藏歌曲
     */
    private Integer song;

    /**
     * 外键，收藏人
     */
    private Integer owner;

    /**
     * 收藏时间
     */
    @Column(name = "collect_time")
    private Date collectTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSong() {
        return song;
    }

    public void setSong(Integer song) {
        this.song = song;
    }

    public Integer getOwner() {
        return owner;
    }

    public void setOwner(Integer owner) {
        this.owner = owner;
    }

    public Date getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(Date collectTime) {
        this.collectTime = collectTime;
    }
}
