package com.bs.music.controller;

import com.bs.music.model.UserInfo;
import com.bs.music.session.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 跳转类
 * Created by wyn on 2016/5/14.
 */
@Controller
public class JumpController {

    @Autowired
    private SessionService sessionService;

    /**
     * 管理员管理用户
     */
    @RequestMapping(value = {"adminUser"})
    public ModelAndView adminUser(HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        if (curuser == null) {
            return new ModelAndView("login");
        } else {
            return new ModelAndView("adminUser");
        }
    }

    /**
     * 登录
     */
    @RequestMapping(value = {"login"})
    public ModelAndView Login() {
        return new ModelAndView("login");
    }

    /**
     * 管理员管理歌曲
     */
    @RequestMapping(value = {"admin"})
    public ModelAndView admin(HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        if (curuser == null) {
            return new ModelAndView("login");
        } else {
            return new ModelAndView("admin");
        }
    }


    /**
     * 管理员上传歌曲
     */
    @RequestMapping(value = {"uploadMusic"})
    public ModelAndView adminUpload(HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        if (curuser == null) {
            return new ModelAndView("login");
        } else {
            return new ModelAndView("uploadMusic");
        }
    }

    /**
     * 个人中心
     */
    @RequestMapping(value = {"personal"})
    public ModelAndView personal(HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        if (curuser == null) {
            return new ModelAndView("login");
        } else {
            return new ModelAndView("personal");
        }
    }

    /**
     * 注册
     */
    @RequestMapping(value = {"register"})
    public ModelAndView register() {
        return new ModelAndView("register");
    }

    /**
     * 搜索用户
     */
    @RequestMapping(value = {"friend"})
    public ModelAndView friend() {
        return new ModelAndView("searchUser");
    }

    /**
     * 播放页
     */
    @RequestMapping(value = {"play"})
    public ModelAndView play(HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        if (curuser == null) {
            return new ModelAndView("login");
        } else {
            return new ModelAndView("play");
        }
    }
}
