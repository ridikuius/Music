package com.bs.music.service.impl;

import com.bs.music.mapper.AreaMapper;
import com.bs.music.model.Area;
import com.bs.music.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wyn on 2016/5/8.
 */
@Service("areaService")
public class AreaServiceImpl extends BaseService<Area> implements AreaService{

    @Autowired
    private AreaMapper areaMapper;
    @Override
    public List<Area> getAll() {
        return areaMapper.selectAll();
    }
}
