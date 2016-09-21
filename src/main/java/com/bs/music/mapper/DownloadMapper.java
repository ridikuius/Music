package com.bs.music.mapper;

import com.bs.music.model.Collect;
import com.bs.music.model.Download;
import com.bs.music.model.SongVo;
import com.bs.music.util.AllMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
public interface DownloadMapper extends AllMapper<Download> {
    /**
     * 显示歌曲信息（按指定属性排序）
     *
     * @param id     歌曲检索字段ID
     * @return 歌曲列表
     */
    List<SongVo> showDownloadSong(@Param("id") Integer id);

    @Select("select * from download where song = #{song} and owner = #{owner}")
    Collect ifDownload(@Param("song") Integer song,@Param("owner") Integer owner);
}
