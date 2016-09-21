package com.bs.music.service;

import com.bs.music.model.Forcus;
import com.bs.music.model.UserInfo;

import java.util.List;

/**
 * Created by wyn on 2016/5/14.
 */
public interface ForcusService extends IService<Forcus>{
    List<UserInfo> getFriend(UserInfo userInfo);
    List<UserInfo> getFans(UserInfo userInfo);
    boolean ifForcus(Forcus forcus);
}
