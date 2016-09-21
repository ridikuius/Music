package com.bs.music.service;

import com.bs.music.model.SongInfo;
import com.bs.music.model.SongVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * 歌曲操作接口
 * Created by shangpanpan on 2016/4/7.
 */
public interface SongService extends IService<SongInfo> {

    /**
     * @param orderBy 分页排序字段
     * @param page
     * @param rows
     * @return 按一定规则排序后的歌曲列表
     */
    List<SongInfo> getOrder(String orderBy, int page, int rows);

    /**
     * 根据条件分页查询
     *
     * @param goodsInfo
     * @param page
     * @param rows
     * @return
     */
    List<SongInfo> selectBySong(SongInfo goodsInfo, int page, int rows);

    /**
     * 根据条件分页查询（并根据指定属性排序）
     *
     * @param songInfo 查询条件
     * @param page      分页条件
     * @param rows      分页条件
     * @param sort      排序条件
     * @return
     */
    PageInfo<SongVo> selectSongInfo( int page, int rows, String sort);

    SongInfo selectOne(SongInfo songInfo);

    int getLastOne();

    PageInfo<SongVo> selectAny(String search,int page, int rows);

}
