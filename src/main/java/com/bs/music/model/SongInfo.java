package com.bs.music.model;

import javax.persistence.*;

/**
 * 歌曲信息
 * Created by shangpanpan on 2016/4/7.
 */
@Table(name = "song")
public class SongInfo {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 歌曲名称
     */
    private String name;

    /**
     * 外键，歌手
     */
    private Integer singer;

    /**
     * 外键，类型
     */
    private  Integer type;

    /**
     * 搜索次数
     */
    @Column(name = "search_count")
    private Integer searchCount;

    /**
     * 收藏次数
     */
    @Column(name = "collect_count")
    private Integer collectCount;

    /**
     * 播放次数
     */
    @Column(name = "play_count")
    private Integer playCount;

    /**
     * 下载（购买次数）
     */
    @Column(name = "download_count")
    private Integer downloadCount;

    /**
     * 价格
     */
    private Integer price;

    /**
     * 歌曲地址
     */
    @Column(name = "song_url")
    private String songUrl;

    /**
     * 时长
     */
    @Column(name = "time_length")
    private String timeLength;

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

    public Integer getSearchCount() {
        return searchCount;
    }

    public void setSearchCount(Integer searchCount) {
        this.searchCount = searchCount;
    }

    public Integer getSinger() {
        return singer;
    }

    public void setSinger(Integer singer) {
        this.singer = singer;
    }

    public Integer getCollectCount() {
        return collectCount;
    }

    public void setCollectCount(Integer collectCount) {
        this.collectCount = collectCount;
    }

    public Integer getPlayCount() {
        return playCount;
    }

    public void setPlayCount(Integer playCount) {
        this.playCount = playCount;
    }

    public Integer getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(Integer downloadCount) {
        this.downloadCount = downloadCount;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getSongUrl() {
        return songUrl;
    }

    public void setSongUrl(String songUrl) {
        this.songUrl = songUrl;
    }

    public String getTimeLength() {
        return timeLength;
    }

    public void setTimeLength(String timeLength) {
        this.timeLength = timeLength;
    }

}
