package com.bs.music.model;

import java.util.Date;

/**
 *
 * Created by wyn on 2016/5/7.
 */
public class SongVo {

    /**
     * 歌曲Id
     */
    private Integer songId;
    /**
     * 歌手Id
     */
    private Integer singerId;

    /**
     * 歌曲类型Id
     */
    private Integer typeId;

    /**
     * 歌曲名称
     */
    private String  songName;

    /**
     * 歌手名称
     */
    private String singerName;
    /**
     * 歌曲类型
     */
    private String songType;

    /**
     * 收藏Id
     */
    private Integer collectId;

    /**
     * 收藏时间
     */
    private Date collectTime;

    /**
     * 下载Id
     */
    private Integer downloadId;

    /**
     * 下载时间
     */
    private Date downloadTime;

    /**
     * 用户Id;
     */
    private Integer userId;

    /**
     * 用户名称
     */
    private String  userName;

    /**
     * 搜索次数
     */
    private Integer searchCount;

    /**
     * 收藏次数
     */
    private Integer collectCount;

    /**
     * 播放次数
     */
    private Integer playCount;

    /**
     * 下载（购买次数）
     */
    private Integer downloadCount;

    /**
     * 歌曲地址
     */
    private String songUrl;

    /**
     * 歌曲时长
     */
    private String timeLength;

    /**
     *歌曲价格
     */
    private Integer songCost;

    /**
     * 图片地址
     */

    private String imageUrl;

    /**
     * 是否被收藏
     */
    private boolean collectStatus;

    public Integer getSongId() {
        return songId;
    }

    public void setSongId(Integer songId) {
        this.songId = songId;
    }

    public Integer getSingerId() {
        return singerId;
    }

    public void setSingerId(Integer singerId) {
        this.singerId = singerId;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getSingerName() {
        return singerName;
    }

    public void setSingerName(String singerName) {
        this.singerName = singerName;
    }

    public String getSongType() {
        return songType;
    }

    public void setSongType(String songType) {
        this.songType = songType;
    }

    public Date getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(Date collectTime) {
        this.collectTime = collectTime;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getCollectId() {
        return collectId;
    }

    public void setCollectId(Integer collectId) {
        this.collectId = collectId;
    }

    public Integer getDownloadId() {
        return downloadId;
    }

    public void setDownloadId(Integer downloadId) {
        this.downloadId = downloadId;
    }

    public Date getDownloadTime() {
        return downloadTime;
    }

    public void setDownloadTime(Date downloadTime) {
        this.downloadTime = downloadTime;
    }

    public Integer getSearchCount() {
        return searchCount;
    }

    public void setSearchCount(Integer searchCount) {
        this.searchCount = searchCount;
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

    public Integer getSongCost() {
        return songCost;
    }

    public void setSongCost(Integer songCost) {
        this.songCost = songCost;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isCollectStatus() {
        return collectStatus;
    }

    public void setCollectStatus(boolean collectStatus) {
        this.collectStatus = collectStatus;
    }
}
