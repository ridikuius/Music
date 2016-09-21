package com.bs.music.model;

import javax.persistence.*;

/**
 * Created by wyn on 2016/5/14.
 */
@Table(name = "forcus")
public class Forcus {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 当前用户,外键
     */
    @Column(name = "this_id")
    private Integer thisId;

    /**
     * 被关注用户，外键
     */
    @Column(name = "friend_id")
    private Integer friendId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getThisId() {
        return thisId;
    }

    public void setThisId(Integer thisId) {
        this.thisId = thisId;
    }

    public Integer getFriendId() {
        return friendId;
    }

    public void setFriendId(Integer friendId) {
        this.friendId = friendId;
    }
}
