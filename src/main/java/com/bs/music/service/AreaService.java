package com.bs.music.service;

import com.bs.music.model.Area;

import java.util.List;

/**
 * Created by wyn on 2016/5/8.
 */
public interface AreaService  extends IService<Area>{
    List<Area> getAll();
}
