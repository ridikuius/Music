package com.bs.music.mapper;

import com.bs.music.model.Singer;
import com.bs.music.model.SingerVo;
import com.bs.music.util.AllMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
public interface SingerMapper extends AllMapper<Singer> {

    List<SingerVo> showSinger(@Param("area") Integer area);
}
