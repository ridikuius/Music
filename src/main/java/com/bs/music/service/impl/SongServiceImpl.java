package com.bs.music.service.impl;

import com.bs.music.mapper.SongMapper;
import com.bs.music.model.SongInfo;
import com.bs.music.model.SongVo;
import com.bs.music.service.SongService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.util.StringUtil;

import java.util.List;
import java.util.Map;

/**
 * 歌曲操作实现
 * Created by shangpanpan on 2016/4/7.
 */
@Service("songService")
public class SongServiceImpl extends BaseService<SongInfo> implements SongService {

    @Autowired
    private SongMapper songMapper;

    @Override
    public List<SongInfo> getOrder(String orderBy, int page, int rows) {
        Example example = new Example(SongInfo.class);
        PageHelper.orderBy(orderBy + " desc");
        PageHelper.startPage(page, rows);
        return selectByExample(example);
    }

    @Override
    public List<SongInfo> selectBySong(SongInfo songInfo, int page, int rows) {
        Example example = new Example(SongInfo.class);
        Example.Criteria criteria = example.createCriteria();
        if (StringUtil.isNotEmpty(songInfo.getName())) {
            criteria.andLike("name", "%" + songInfo.getName() + "%");
        }
        //分页查询
        PageHelper.startPage(page, rows);
        return selectByExample(example);
    }

    @Override
    public PageInfo<SongVo> selectSongInfo(int page, int rows, String sort) {
        if ((sort == null)) {
            PageHelper.orderBy("id desc");
        }
        PageHelper.orderBy(sort + " desc");
        PageHelper.startPage(page, rows);
        List<SongVo> songVos = songMapper.showSongInfo();
        return new PageInfo<SongVo>(songVos);
    }

    @Override
    public SongInfo selectOne(SongInfo songInfo) {
        return songMapper.selectOne(songInfo);
    }

    @Override
    public int getLastOne() {
        return songMapper.getLastOne();
    }

    @Override
    public PageInfo<SongVo> selectAny(String search, int page, int rows) {
        PageHelper.startPage(page, rows);
        List<SongVo> songVos = songMapper.selectAlls(search);
        return new PageInfo<SongVo>(songVos);
    }
}
