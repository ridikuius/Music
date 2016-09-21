package com.bs.music.service;

import com.bs.music.model.UserInfo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * 用户操作接口
 * Created by wangyanan on 2016/4/6.
 */
public interface UserInfoService extends IService<UserInfo>{

    /**
     * 用户注册
     * @param user
     * @return
     */
    boolean register(UserInfo user);

    /**
     * 用户登录
     * @param user
     * @return
     */
    boolean login(UserInfo user);


    /**
     * 查出所有用户
     * @return
     */
    PageInfo<UserInfo> getAll(int page, int rows);

    UserInfo getByEmail(UserInfo userInfo);

    UserInfo getByName(UserInfo userInfo);

    List<UserInfo> selectAll();

    List<UserInfo> selectLikeName(UserInfo userInfo,int page, int rows);


}
