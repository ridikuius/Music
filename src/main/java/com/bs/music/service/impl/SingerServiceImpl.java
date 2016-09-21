package com.bs.music.service.impl;

import com.bs.music.mapper.SingerMapper;
import com.bs.music.model.Area;
import com.bs.music.model.Singer;
import com.bs.music.model.SingerVo;
import com.bs.music.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
@Service("singerService")
public class SingerServiceImpl  extends BaseService<Singer> implements SingerService{
    @Autowired
    private SingerMapper singerMapper;
    @Override
    public List<SingerVo> getByArea(Area area) {
        Integer areaId = area.getId();
        singerMapper.showSinger(areaId);
        return null;
    }

    @Override
    public Singer getByName(Singer singer) {
      return  singerMapper.selectOne(singer);
    }
}
