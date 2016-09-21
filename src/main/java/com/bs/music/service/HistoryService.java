package com.bs.music.service;

import com.bs.music.model.History;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * Created by wyn on 2016/5/28.
 */
public interface HistoryService extends IService<History>{

    PageInfo<SongVo> historyList(UserInfo userInfo,int page,int rows);

    List<SongVo> historyList(UserInfo userInfo);


    boolean ifPlay(History history);
}
