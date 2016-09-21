package com.bs.music.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by wyn on 2016/5/7.
 */
@Table(name = "download")
public class Download {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 外键，歌曲Id
     */
    private Integer song;
    /**
     * 外键，用户Id
     */
    private Integer owner;

    /**
     * 下载时间
     */
    @Column(name = "download_time")
    private Date downloadTime;

    /**
     * 下载地址
     */
    @Column(name = "download_url")
    private String downloadUrl;

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

    public Date getDownloadTime() {
        return downloadTime;
    }

    public void setDownloadTime(Date downloadTime) {
        this.downloadTime = downloadTime;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}
