package com.bs.music.mapper;

import com.bs.music.model.History;
import com.bs.music.model.SongVo;
import com.bs.music.util.AllMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by wyn on 2016/5/28.
 */
public interface HistoryMapper extends AllMapper<History> {

    @Select(" select s.id as songId,s.name as songName,si.id as singerId,si.name as singerName,t.id as typeId,\n" +
            " t.name as songType,s.time_length as timeLength,si.protait as imageUrl ,s.song_url as songUrl" +
            " from history as h,song as s,singer as si,song_type as t" +
            " where h.song = s.id" +
            " AND s.type  = t.id" +
            " AND s.singer = si.id" +
            " AND h.owner = #{user}")
    List<SongVo> historyList(@Param("user") Integer user);

    @Select("select * from history where song = #{song} and owner = #{owner}")
    History ifPlay(@Param("song") Integer song,@Param("owner") Integer owner);
}
