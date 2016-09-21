package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.Collect;
import com.bs.music.model.SongInfo;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.bs.music.service.CollectService;
import com.bs.music.service.SongService;
import com.bs.music.session.SessionService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * Created by wyn on 2016/5/7.
 */
@Controller
public class CollectController {
    @Autowired
    private SessionService sessionService;
    @Autowired
    private CollectService collectService;
    @Autowired
    private SongService songService;

    /**
     * 添加收藏
     */
    @RequestMapping(value = {"user/collect"})
    public ModelAndView collect(@RequestBody String song, HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        SongInfo songInfo = JSON.parseObject(song, SongInfo.class);
        Collect collect = new Collect();
        collect.setOwner(curuser.getId());
        collect.setSong(songInfo.getId());
        collect.setCollectTime(new Date());
        SongInfo songs = songService.selectByKey(songInfo);
        songs.setCollectCount(songs.getCollectCount() + 1);
        collectService.save(collect);
        songService.updateNotNull(songs);
        return new ModelAndView("");
    }


    /**
     * 取消收藏
     */
    @RequestMapping(value = {"user/cancleCollect"})
    public ModelAndView cancleCollect(@RequestBody String collects, HttpServletRequest request) {
        Collect collect = JSON.parseObject(collects, Collect.class);
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        collect.setOwner(curuser.getId());
        SongInfo songInfo = songService.selectByKey(collect.getSong());
        songInfo.setCollectCount(songInfo.getCollectCount() - 1);
        collectService.delete(collect);
        songService.updateNotNull(songInfo);
        return new ModelAndView("personal");
    }

    /**
     * 收藏歌曲列表
     * 显示收藏歌曲
     */
    @RequestMapping(value = {"user/collect/list"})
    public ModelAndView collectList(HttpServletRequest request, @RequestBody String user,
                                    @RequestParam(required = false, defaultValue = "1") int page,
                                    @RequestParam(required = false, defaultValue = "5") int rows) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        UserInfo userInfo = JSON.parseObject(user, UserInfo.class);
        Integer id = userInfo.getId();
        Integer sessionId = curuser.getId();
        if (id == -1 || id == sessionId) {
            PageInfo<SongVo> collectList = collectService.showCollectSong(curuser, page, rows);
            return new ModelAndView("personal", "list", collectList);
        } else {
            PageInfo<SongVo> collectList = collectService.showCollectSong(userInfo, page, rows);
            return new ModelAndView("personal", "list", collectList);
        }
    }

    /**
     * 该歌曲是否被收藏
     */
    @RequestMapping(value = {"user/ifCollect"})
    public ModelAndView ifCollect(@RequestBody String song, HttpServletRequest request) {
        SongVo songVo = JSON.parseObject(song, SongVo.class);
        UserInfo userInfo = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        Collect collect = new Collect();
        collect.setSong(songVo.getSongId());
        collect.setOwner(userInfo.getId());
        boolean result = collectService.ifCollect(collect);
        return new ModelAndView("shop", "result", result);
    }
}
