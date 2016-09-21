package com.bs.music.service.impl;

import com.bs.music.mapper.SongTypeMapper;
import com.bs.music.model.SongType;
import com.bs.music.service.SongTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
@Service("songTypeService")
public class SongTypeServiceImpl extends BaseService<SongType> implements SongTypeService {

    @Autowired
    private SongTypeMapper songTypeMapper;

    @Override
    public List<SongType> getAll() {
        return songTypeMapper.selectAll();
    }
}
