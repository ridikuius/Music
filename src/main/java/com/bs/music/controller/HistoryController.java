package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.History;
import com.bs.music.model.SongInfo;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.bs.music.service.HistoryService;
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
import java.util.List;

/**
 * Created by wyn on 2016/5/28.
 */
@Controller
public class HistoryController {

    @Autowired
    private SessionService sessionService;
    @Autowired
    private HistoryService historyService;

    @Autowired
    private SongService songService;

    /**
     * 显示历史播放
     * 返回分页信息
     */
    @RequestMapping(value = {"user/history/list"})
    public ModelAndView collectList(HttpServletRequest request, @RequestBody String user,
                                    @RequestParam(required = false, defaultValue = "1") int page,
                                    @RequestParam(required = false, defaultValue = "5") int rows) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        UserInfo userInfo = JSON.parseObject(user, UserInfo.class);
        Integer id = userInfo.getId();
        Integer sessionId = curuser.getId();
        if (id == -1 || id .equals(sessionId)) {
            PageInfo<SongVo> historyList = historyService.historyList(curuser, page, rows);
            return new ModelAndView("personal", "list", historyList);
        } else {
            PageInfo<SongVo> historyList = historyService.historyList(userInfo, page, rows);
            return new ModelAndView("personal", "list", historyList);
        }
    }

    /**
     * 显示历史播放
     */
    @RequestMapping(value = {"user/history/all/list"})
    public ModelAndView historyList(HttpServletRequest request, @RequestBody String user) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        UserInfo userInfo = JSON.parseObject(user, UserInfo.class);
        Integer id = userInfo.getId();
        Integer sessionId = curuser.getId();
        if (id == -1 || id .equals(sessionId) ) {
            List<SongVo> historyList = historyService.historyList(curuser);
            return new ModelAndView("personal", "list", historyList);
        } else {
            List<SongVo> historyList = historyService.historyList(userInfo);
            return new ModelAndView("personal", "list", historyList);
        }
    }



    /**
     * 添加歌曲到播放列表
     */
    @RequestMapping(value = {"user/play"})
    public ModelAndView play(@RequestBody String song, HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        SongInfo songInfo = JSON.parseObject(song, SongInfo.class);
        History history = new History();
        history.setSong(songInfo.getId());
        history.setOwner(curuser.getId());
        history.setDoTime(new Date());
        if (historyService.ifPlay(history)) {
            return new ModelAndView("");
        } else {
            SongInfo songs = songService.selectByKey(songInfo);
            songs.setPlayCount(songs.getPlayCount() + 1);
            historyService.save(history);
            songService.updateNotNull(songs);
            return new ModelAndView("");
        }
    }


    /**
     * 删除历史播放列表中歌曲
     */
    @RequestMapping(value = {"user/play/del"})
    public ModelAndView delPlay(@RequestBody String historys, HttpServletRequest request) {
        History history = JSON.parseObject(historys, History.class);
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        history.setOwner(curuser.getId());
        historyService.delete(history);
        return new ModelAndView("");
    }

}
