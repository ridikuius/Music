package com.bs.music.controller;

import com.alibaba.fastjson.JSON;
import com.bs.music.model.*;
import com.bs.music.service.MessageService;
import com.bs.music.service.SingerService;
import com.bs.music.service.SongService;
import com.bs.music.service.UserInfoService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.log4j.Logger;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.mp3.MP3AudioHeader;
import org.jaudiotagger.audio.mp3.MP3File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 上传
 * Created by wangyanan on 2016/5/13.
 */
@Controller
public class UploadController {
    private static final Logger LOGGER = Logger.getLogger(UploadController.class);
    @Autowired
    private SongService songService;

    @Autowired
    private SingerService singerService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private MessageService messageService;


    /**
     * 歌曲上传
     */
    @RequestMapping("upload")
    public ModelAndView upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IllegalStateException, IOException {
        String realPath = request.getSession().getServletContext().getRealPath("/upload");
        SongInfo songInfo = new SongInfo();
        String songLength = "";
        File pathFile = new File(realPath);
        if (!pathFile.exists()) {
            pathFile.mkdirs();
        }
        LOGGER.info("文件类型：" + file.getContentType());
        LOGGER.info("文件名称：" + file.getOriginalFilename());
        LOGGER.info("文件大小:" + file.getSize());

        //将文件copy上传到服务器
        file.transferTo(new File(realPath + "/" + file.getOriginalFilename()));
        if (file.getContentType().contains("mp3")) {
            File f = new File(realPath + "/" + file.getOriginalFilename());
            songLength = method2(f);
            LOGGER.info("时长" + songLength);
        }
        songInfo.setSongUrl(file.getOriginalFilename());
        songInfo.setTimeLength(songLength);
        songInfo.setDownloadCount(0);
        songInfo.setPlayCount(0);
        songInfo.setCollectCount(0);
        songInfo.setSearchCount(0);
        songService.save(songInfo);
        return new ModelAndView("uploadMusic");
    }


    /**
     * 保存上传歌曲
     */
    @RequestMapping("uploadSave")
    @ResponseBody
    public ModelAndView save(@RequestBody String song) {
        SongVo songVo = JSON.parseObject(song, SongVo.class);
        Integer id = songService.getLastOne();
        SongInfo songInfo = new SongInfo();
        songInfo.setId(id);
        songInfo.setName(songVo.getSongName());
        songInfo.setType(songVo.getTypeId());
        Singer singer = new Singer();
        singer.setName(songVo.getSingerName());
        Integer singerId = singerService.getByName(singer).getId();
        songInfo.setSinger(singerId);
        songInfo.setPrice(songVo.getSongCost());
        songService.updateNotNull(songInfo);

        //推送消息
        List<UserInfo> userList = userInfoService.selectAll();
        Map<Integer, UserInfo> map = Maps.uniqueIndex(userList, UserInfo::getId);
        List<Integer> userIds = Lists.transform(userList, UserInfo::getId);
        for (Integer userid : userIds) {
            Message message = new Message();
            message.setReceiver(userid);
            message.setPushTime(new Date());
            message.setContent("亲爱的 " + map.get(userid).getName() + " 用户 " + "新歌" + songVo.getSongName() + "上架了哦");
            messageService.save(message);
        }
        return new ModelAndView("admin");
    }

    /**
     * 歌曲时长处理方法
     */
    public String method2(File file) {
        String timeLength = "";
        try {
            MP3File f = (MP3File) AudioFileIO.read(file);
            MP3AudioHeader audioHeader = (MP3AudioHeader) f.getAudioHeader();
            int i = audioHeader.getTrackLength();
            if (i % 60 < 10) {
                timeLength = "0" + i / 60 + ":" + "0" + i % 60;
            } else {
                timeLength = "0" + i / 60 + ":" + i % 60;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return timeLength;
    }

}

