package com.bs.music.mapper;

import com.bs.music.model.SongInfo;
import com.bs.music.model.SongVo;
import com.bs.music.util.AllMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 歌曲操作通用mapper
 * Created by shangpanpan on 2016/4/7.
 */
public interface SongMapper extends AllMapper<SongInfo> {


    /**
     * 显示歌曲信息（按指定属性排序）
     *
     * @return 歌曲列表
     */
    List<SongVo> showSongInfo();


    @Select("select max(id) from song")
    int getLastOne();


    List<SongVo> selectAlls(@Param("search") String search);
}
