package com.bs.music.service.impl;

import com.bs.music.mapper.CollectMapper;
import com.bs.music.model.Collect;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.bs.music.service.CollectService;
import com.bs.music.service.impl.BaseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */

@Service("collectService")
public class CollectServiceImpl extends BaseService<Collect> implements CollectService {
    @Autowired
    private CollectMapper collectMapper;


    @Override
    public PageInfo<SongVo> showCollectSong(UserInfo userInfo, int page, int rows) {
        Integer id = userInfo.getId();
        PageHelper.startPage(page, rows);
        List<SongVo> songVos = collectMapper.showCollectSong(id);
        return new PageInfo<SongVo>(songVos);    }

    @Override
    public boolean ifCollect(Collect collect) {
        Integer song = collect.getSong();
        Integer owner = collect.getOwner();
        Collect c = collectMapper.ifCollect(song,owner);
        if (c==null){
            return false;//未收藏
        }
        else{
            return true;//已收藏
        }
    }
}
