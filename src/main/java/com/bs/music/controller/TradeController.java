package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.Download;
import com.bs.music.model.SongInfo;
import com.bs.music.model.SongVo;
import com.bs.music.model.UserInfo;
import com.bs.music.service.DownloadService;
import com.bs.music.service.SongService;
import com.bs.music.service.UserInfoService;
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
public class TradeController {
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private SongService songService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private DownloadService downloadService;
    /**
     * 购买
     */
    @RequestMapping("user/trade")
    private boolean trade(SongInfo songInfo, HttpServletRequest request) {
        SongInfo thisSong = songService.selectByKey(songInfo);
        Integer price = thisSong.getPrice();
        UserInfo userInfo = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        Integer asset = (userInfoService.selectByKey(userInfo)).getAsset();
        if (price > asset) {
            return false;
        }
        userInfo.setAsset(asset - price);
        userInfoService.updateNotNull(userInfo);
        UserInfo admin = new UserInfo();
        admin.setId(1);
        Integer adminAsset = (userInfoService.selectByKey(admin)).getAsset();
        admin.setAsset(adminAsset + price);
        userInfoService.updateNotNull(admin);
        return true;
    }
    /**
     * 付款
     */
    @RequestMapping("user/pay")
    public int saveDownload(SongInfo songInfo, HttpServletRequest request) {
        Download download = new Download();
        UserInfo userInfo = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        download.setOwner(userInfo.getId());
        download.setSong(songInfo.getId());
        download.setDownloadTime(new Date());
        download.getDownloadUrl();
        return downloadService.save(download);
    }

    /**
     * 显示该用户购买的歌曲
     */
    @RequestMapping("user/trade/list")
    public ModelAndView downloadSong(HttpServletRequest request,@RequestBody String user,
                                         @RequestParam(required = false, defaultValue = "1") int page,
                                         @RequestParam(required = false, defaultValue = "5") int rows) {
        UserInfo userInfo = JSON.parseObject(user, UserInfo.class);
        Integer id = userInfo.getId();
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        Integer sessionId = curuser.getId();
        if (id==-1 || id==sessionId){
            PageInfo<SongVo> downloadList =  downloadService.showDownloadSong(curuser, page, rows);
            return new ModelAndView("personal","list",downloadList);
        }
        else{
            PageInfo<SongVo> downloadList =  downloadService.showDownloadSong(userInfo, page, rows);
            return new ModelAndView("personal","list",downloadList);
        }

    }

}
