package com.bs.music.service;

import com.bs.music.model.Download;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.github.pagehelper.PageInfo;

/**
 * Created by wyn on 2016/5/7.
 */
public interface DownloadService extends IService<Download> {

    PageInfo<SongVo> showDownloadSong(UserInfo userInfo, int page, int rows);

    boolean ifDownoad(Download download);
}
