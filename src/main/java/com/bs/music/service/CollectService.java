package com.bs.music.service;

import com.bs.music.model.Collect;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.github.pagehelper.PageInfo;

/**
 * Created by wyn on 2016/5/7.
 */
public interface CollectService extends IService<Collect> {

    PageInfo<SongVo> showCollectSong(UserInfo userInfo,int page, int rows);
    boolean ifCollect(Collect collect);

}
