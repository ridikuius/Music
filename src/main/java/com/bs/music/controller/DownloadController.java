package com.bs.music.controller;


import com.alibaba.fastjson.JSON;
import com.bs.music.model.Download;
import com.bs.music.model.SongInfo;
import com.bs.music.model.UserInfo;
import com.bs.music.service.DownloadService;
import com.bs.music.service.SongService;
import com.bs.music.service.UserInfoService;
import com.bs.music.session.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;

@Controller
public class DownloadController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private DownloadService downloadService;

    @Autowired
    private SongService songService;

    @Autowired
    private UserInfoService userInfoService;

    /**
     * 下载歌曲
     *
     * @param id 歌曲Id
     */
    @RequestMapping("user/download")
    public ModelAndView downloadFile(Integer id, HttpServletResponse response, HttpServletRequest request) {
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        response.setCharacterEncoding("utf-8");
        SongInfo songInfo = songService.selectByKey(id);
        String fileName = songInfo.getName();
        String path = songInfo.getSongUrl();
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName=" + path);
        String realPath = request.getSession().getServletContext().getRealPath("/upload");

        try {
            File file = new File(fileName);
            System.out.println(file.getAbsolutePath());
            InputStream inputStream = new FileInputStream(realPath + "/" + path);
            OutputStream os = response.getOutputStream();
            byte[] b = new byte[1024];
            int length;
            while ((length = inputStream.read(b)) > 0) {
                os.write(b, 0, length);
            }
            inputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


        Download download = new Download();
        download.setSong(songInfo.getId());
        download.setOwner(curuser.getId());
        download.setDownloadTime(new Date());
        if (downloadService.ifDownoad(download)) {
            return new ModelAndView("");
        } else {
            downloadService.save(download);
            songInfo.setDownloadCount(songInfo.getDownloadCount() + 1);
            songService.updateNotNull(songInfo);
            return new ModelAndView("");
        }
    }

    /**
     * 判断是否付过款
     */
    @RequestMapping("user/ifPay")
    public ModelAndView ifPay(@RequestBody String songs, HttpServletRequest request) {
        SongInfo songInfo = JSON.parseObject(songs, SongInfo.class);
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        UserInfo userInfo = userInfoService.getByEmail(curuser);
        SongInfo song = songService.selectOne(songInfo);
        Integer sp = song.getPrice();
        Integer ua = userInfo.getAsset();
        if (sp < ua) {
            userInfo.setAsset(ua - sp);
            userInfoService.updateNotNull(userInfo);
            return new ModelAndView("show", "result", true);

        } else {
            return new ModelAndView("show", "result", false);
        }
    }

    /**
     * 判断是否下载过
     */
    @RequestMapping("user/ifDownload")
    public ModelAndView ifDownload(@RequestBody String songs, HttpServletRequest request) {
        SongInfo songInfo = JSON.parseObject(songs, SongInfo.class);
        UserInfo curuser = (UserInfo) sessionService.getAttribute(request, Constants.User_SESSION);
        Download download = new Download();
        download.setOwner(curuser.getId());
        download.setSong(songInfo.getId());
        boolean result = downloadService.ifDownoad(download);
        return new ModelAndView("show", "result", result);

    }
}
