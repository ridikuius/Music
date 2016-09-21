package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.SongType;
import com.bs.music.service.SongTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by wyn on 2016/5/7.
 */
@Controller
public class SongTypeController {
    @Autowired
    private SongTypeService songTypeService;

    /***
     * 显示类型
     *
     * @return
     */
    @RequestMapping("songType")
    public List<SongType> showAllType() {
        return songTypeService.getAll();
    }

    /**
     * 增加类型
     */
    @RequestMapping("addType")
    public ModelAndView addType(@RequestBody String songType) {
        SongType song = JSON.parseObject(songType, SongType.class);
        songTypeService.save(song);
        return new ModelAndView("uploadMusic");
    }
}
