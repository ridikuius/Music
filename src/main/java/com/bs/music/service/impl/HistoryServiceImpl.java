package com.bs.music.service.impl;

import com.bs.music.mapper.HistoryMapper;
import com.bs.music.model.History;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.bs.music.service.HistoryService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wyn on 2016/5/28.
 */
@Service("historyService")
public class HistoryServiceImpl extends BaseService<History> implements HistoryService{
    @Autowired
    private HistoryMapper historyMapper;


    @Override
    public PageInfo<SongVo> historyList(UserInfo userInfo,int page,int rows) {
       Integer user = userInfo.getId();
        PageHelper.startPage(page, rows);
        List<SongVo> songVos = historyMapper.historyList(user);
        return new PageInfo<SongVo>(songVos);
    }

    @Override
    public List<SongVo> historyList(UserInfo userInfo) {
        Integer user = userInfo.getId();
        return historyMapper.historyList(user);
    }

    @Override
    public boolean ifPlay(History history) {
        Integer song = history.getSong();
        Integer owner = history.getOwner();
        History s = historyMapper.ifPlay(song,owner);
        if (s==null){
            return false;//未添加到播放列表
        }
        else{
            return true;//已添加到播放列表
        }
    }
}
