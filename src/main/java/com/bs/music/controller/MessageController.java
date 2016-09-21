package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.Message;
import com.bs.music.model.UserInfo;
import com.bs.music.service.MessageService;
import com.bs.music.service.UserInfoService;
import com.bs.music.session.SessionService;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 *
 * Created by wyn on 2016/5/7.
 */
@Controller
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SessionService sessionService;

    /**
     * 读消息
     */
    @RequestMapping("user/read")
    public void readMessage(@RequestBody String message) {
        Message message1 = JSON.parseObject(message, Message.class);
        messageService.delete(message1);
    }

    /**
     * 获取消息列表
     */
    @RequestMapping("user/message")
    public List<Message> getMessage(HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        Message message = new Message();
        List<Message> messages = Lists.newArrayList();
        if (userInfo == null) {
            return messages;
        } else {
            message.setReceiver(userInfo.getId());
            messages = messageService.query(message);
            return messages;
        }

    }
}
