package com.bs.music.service.impl;

import com.bs.music.mapper.DownloadMapper;
import com.bs.music.model.Collect;
import com.bs.music.model.Download;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.bs.music.service.DownloadService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */

@Service("downloadService")
public class DownloadServiceImpl extends BaseService<Download> implements DownloadService {
    @Autowired
    private DownloadMapper downloadMapper;


    @Override
    public PageInfo<SongVo> showDownloadSong(UserInfo userInfo, int page, int rows) {
        Integer id = userInfo.getId();
        PageHelper.startPage(page, rows);
        List<SongVo> songVos = downloadMapper.showDownloadSong(id);
        return new PageInfo<SongVo>(songVos);    }

    @Override
    public boolean ifDownoad(Download download) {
        Integer song = download.getSong();
        Integer owner = download.getOwner();
        Collect c = downloadMapper.ifDownload(song,owner);
        if (c==null){
            return false;//未下载
        }
        else{
            return true;//已下载
        }
    }
}
