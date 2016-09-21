package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.Forcus;
import com.bs.music.model.UserInfo;
import com.bs.music.service.ForcusService;
import com.bs.music.service.UserInfoService;
import com.bs.music.session.SessionService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 *
 * Created by wyn on 2016/5/14.
 */
@Controller
public class ForcusController {
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private ForcusService forcusService;


    /**
     * 关注
     */

    @RequestMapping("user/focus")
    public ModelAndView forcus(@RequestBody String forcus,HttpServletRequest request){
        Forcus focus = JSON.parseObject(forcus, Forcus.class);
        UserInfo userInfo = (UserInfo)sessionService.getAttribute(request,Constants.User_SESSION);
        if (userInfo == null){
            return new ModelAndView("login");
        }
        //关注成功
        focus.setThisId(userInfo.getId());
        forcusService.save(focus);

        UserInfo uu = userInfoService.getByEmail(userInfo);
        //当前用户好友数+1
        uu.setFriendCount(uu.getFriendCount()+1);
        userInfoService.updateNotNull(uu);

        //被关注用户好友数+1
        UserInfo otherUser = userInfoService.selectByKey(focus.getFriendId());
        otherUser.setFansCount(otherUser.getFansCount() + 1);
        userInfoService.updateNotNull(otherUser);

        return new ModelAndView("personal");
    }
    /**
     * 取消关注
     */
    @RequestMapping("user/cancleFocus")
    public ModelAndView cancleForcus(@RequestBody String forcus,HttpServletRequest request){
        Forcus focus = JSON.parseObject(forcus, Forcus.class);
        UserInfo userInfo = (UserInfo)sessionService.getAttribute(request,Constants.User_SESSION);
        focus.setThisId(userInfo.getId());
        forcusService.delete(focus);

        //当前用户好友数-1
        UserInfo uu = userInfoService.getByEmail(userInfo);
        uu.setFriendCount(uu.getFriendCount()-1);
        userInfoService.updateNotNull(uu);

        //被关注用户好友数-1
        UserInfo otherUser = userInfoService.selectByKey(focus.getFriendId());
        otherUser.setFansCount(otherUser.getFansCount()-1);

        return new ModelAndView("personal");
    }
    /**
     * 好友列表
     */
    @RequestMapping("user/friend")
    public ModelAndView getFriend(@RequestBody String user,HttpServletRequest request){
        UserInfo otherUser = JSON.parseObject(user, UserInfo.class);
        List<UserInfo> userInfos = Lists.newArrayList();
        Integer id  = otherUser.getId();
        if (id==-1) {
            UserInfo userInfo = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
            userInfos = forcusService.getFriend(userInfo);
        }
        else {
            userInfos = forcusService.getFriend(otherUser);
        }
        return new ModelAndView("personal","userInfos",userInfos);
    }

    /**
     * 粉丝列表
     * @param user
     * @param request
     * @return
     */
    @RequestMapping("user/fans")
    public ModelAndView getFans(@RequestBody String user,HttpServletRequest request){
        UserInfo otherUser = JSON.parseObject(user, UserInfo.class);
        List<UserInfo> userInfos = Lists.newArrayList();
        Integer id  = otherUser.getId();
        if (id==-1) {
            UserInfo userInfo = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
            userInfos = forcusService.getFans(userInfo);
        }
        else {
            userInfos = forcusService.getFans(otherUser);
        }
        return new ModelAndView("personal","userInfos",userInfos);
    }

    /**
     * 是否已关注
     */
    @RequestMapping("user/ifForcus")
    public ModelAndView ifForcus(@RequestBody String user,HttpServletRequest request){
        UserInfo otherUser = JSON.parseObject(user, UserInfo.class);
        UserInfo userInfo = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        Forcus focus = new Forcus();
        focus.setThisId(userInfo.getId());
        focus.setFriendId(otherUser.getId());
        boolean result = forcusService.ifForcus(focus);
        return  new ModelAndView("personal","result",result);
    }
}
