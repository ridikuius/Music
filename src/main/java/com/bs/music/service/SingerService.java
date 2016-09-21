package com.bs.music.service;

import com.bs.music.model.Area;
import com.bs.music.model.Singer;
import com.bs.music.model.SingerVo;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
public interface SingerService extends IService<Singer>{

    List<SingerVo> getByArea(Area area);

    Singer getByName(Singer singer);

}
