package com.bs.music.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by wyn on 2016/5/28.
 */
@Table(name = "history")
public class History {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 歌曲，外键
     */
    private Integer song;

    /**
     * 用户，外键
     */
    private Integer owner;

    /**
     * 添加时间
     */
    @Column(name = "do_time")
    private Date doTime;

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

    public Date getDoTime() {
        return doTime;
    }

    public void setDoTime(Date doTime) {
        this.doTime = doTime;
    }
}
