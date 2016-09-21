package com.bs.music.controller;

import com.bs.music.model.Area;
import com.bs.music.model.Singer;
import com.bs.music.model.SingerVo;
import com.bs.music.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
@Controller
public class SingerController {
    @Autowired
    private SingerService singerService;

    /**
     * 添加歌手（备用方法）
     */
    public void addSinger(Singer singer) {
        singerService.save(singer);
    }

    /**
     * 删除歌手（备用方法）
     */
    public void deleteSinger(Singer singer) {
        singerService.delete(singer);
    }

    /**
     * 按地区查找歌手（备用方法）
     */
    public List<SingerVo> getByArea(Area area) {
        return singerService.getByArea(area);
    }
}
