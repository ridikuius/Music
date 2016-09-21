package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.SongInfo;
import com.bs.music.model.SongVo;
import com.bs.music.service.SongService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 歌曲操作控制类
 * Created by shangpanpan on 2016/4/7.
 */
@Controller
public class SongController {
    @Autowired
    private SongService songService;

    private String page_list = "index";

    private String show_info = "show";

    /**
     * 首页
     */
    @RequestMapping(value = {"list", "index", "index.html", ""})
    public ModelAndView getList(@RequestParam(required = false, defaultValue = "1") int page,
                                @RequestParam(required = false, defaultValue = "8") int rows, String sort) {
        ModelAndView result = new ModelAndView(page_list);
        PageInfo<SongVo> songInfoList = songService.selectSongInfo(page, rows, sort);
        result.addObject("pageInfo", songInfoList);
        result.addObject("page", page);
        result.addObject("rows", rows);
        return result;
    }


    /**
     * 列表页 全部歌曲
     */
    @RequestMapping(value = {"showList"})
    public ModelAndView showList(@RequestParam(required = false, defaultValue = "1") int page,
                                 @RequestParam(required = false, defaultValue = "5") int rows, String sort) {
        ModelAndView result = new ModelAndView("show");
        PageInfo<SongVo> songInfoList = songService.selectSongInfo(page, rows, sort);
        result.addObject("pageInfo", songInfoList);
        result.addObject("page", page);
        result.addObject("rows", rows);
        return result;
    }

    /**
     * 模糊查询
     */
    @RequestMapping(value = "select")
    public ModelAndView getList(String search,
                                @RequestParam(required = false, defaultValue = "1") int page,
                                @RequestParam(required = false, defaultValue = "5") int rows, String sort) {
        ModelAndView result = new ModelAndView("show");
        PageInfo<SongVo> songInfoList = songService.selectAny(search, page, rows);
        result.addObject("pageInfo", songInfoList);
        result.addObject("page", page);
        result.addObject("rows", rows);
        return result;
    }

    /**
     * 模糊查询
     */
    @RequestMapping(value = "type/select")
    public ModelAndView getTypeList(String search,
                                @RequestParam(required = false, defaultValue = "1") int page,
                                @RequestParam(required = false, defaultValue = "8") int rows, String sort) {
        ModelAndView result = new ModelAndView("index");
        PageInfo<SongVo> songInfoList = songService.selectAny(search, page, rows);
        result.addObject("pageInfo", songInfoList);
        result.addObject("page", page);
        result.addObject("rows", rows);
        return result;
    }


    /**
     * 管理员歌曲管理
     */
    @RequestMapping(value = {"admin/songlist"})
    public ModelAndView songList(@RequestParam(required = false, defaultValue = "1") int page,
                                 @RequestParam(required = false, defaultValue = "5") int rows, String sort) {
        ModelAndView result = new ModelAndView("admin");
        PageInfo<SongVo> songInfoList = songService.selectSongInfo(page, rows, sort);
        result.addObject("pageInfo", songInfoList);
        result.addObject("page", page);
        result.addObject("rows", rows);
        return result;

    }

    /**
     * 管理员删除歌曲
     */
    @RequestMapping("admin/song/del")
    public ModelAndView delete(@RequestBody String song) {
        SongInfo userInfo = JSON.parseObject(song, SongInfo.class);
        songService.delete(userInfo);
        return new ModelAndView("admin");
    }

    /**
     * 单个歌曲列表页
     */
    @RequestMapping(value = {"show"})
    public ModelAndView getPyId(SongInfo songInfo) {
        ModelAndView result = new ModelAndView(show_info);
        SongInfo song = songService.selectByKey(songInfo);
        result.addObject("song", song);
        return result;
    }

    /**
     * 歌曲列表页
     */
    @RequestMapping(value = {"songlist"})
    public ModelAndView songLists(@RequestParam(required = false, defaultValue = "1") int page,
                                  @RequestParam(required = false, defaultValue = "5") int rows, String sort) {
        ModelAndView result = new ModelAndView("show");
        PageInfo<SongVo> songInfoList = songService.selectSongInfo(page, rows, sort);
        result.addObject("pageInfo", songInfoList);
        result.addObject("page", page);
        result.addObject("rows", rows);
        return result;

    }


}
