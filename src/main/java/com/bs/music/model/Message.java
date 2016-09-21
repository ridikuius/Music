package com.bs.music.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by wyn on 2016/5/7.
 */
@Table(name = "message")
public class Message {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 外键，发信人
     */
    private Integer sender;

    /**
     * 外键，收信人
     */
    private Integer receiver;

    /**
     * 外键，歌曲
     */
    private Integer song;

    /**
     * 推送时间
     */
    @Column(name = "push_time")
    private Date pushTime;

    /**
     * 推送内容
     */
    private String content;

    /**
     * 是否已读
     */
    @Column(name = "if_read")
    private Integer ifRead;

    public Integer getId() {
        return id;
    }


    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getReceiver() {
        return receiver;
    }

    public void setReceiver(Integer receiver) {
        this.receiver = receiver;
    }

    public Integer getSender() {
        return sender;
    }

    public void setSender(Integer sender) {
        this.sender = sender;
    }

    public Integer getSong() {
        return song;
    }

    public void setSong(Integer song) {
        this.song = song;
    }

    public Date getPushTime() {
        return pushTime;
    }

    public void setPushTime(Date pushTime) {
        this.pushTime = pushTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getIfRead() {
        return ifRead;
    }

    public void setIfRead(Integer ifRead) {
        this.ifRead = ifRead;
    }
}
