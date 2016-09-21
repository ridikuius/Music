package com.bs.music.service;

import com.bs.music.model.SongType;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
public interface SongTypeService extends IService<SongType> {
     List<SongType> getAll();
}
