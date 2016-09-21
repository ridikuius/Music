package com.bs.music.service.impl;

import com.bs.music.mapper.ForcusMapper;
import com.bs.music.model.Forcus;
import com.bs.music.model.UserInfo;
import com.bs.music.service.ForcusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wyn on 2016/5/14.
 */
@Service("forcusService")
public class ForcusServiceImpl extends BaseService<Forcus> implements ForcusService{
    @Autowired
    private ForcusMapper forcusMapper;

    @Override
    public List<UserInfo> getFriend(UserInfo userInfo) {
        Integer id = userInfo.getId();
        return forcusMapper.firendList(id);
    }

    @Override
    public List<UserInfo> getFans(UserInfo userInfo) {
        Integer id = userInfo.getId();
        return forcusMapper.fansList(id);
    }

    @Override
    public boolean ifForcus(Forcus focus) {
        Integer id1 = focus.getThisId();
        Integer id2 = focus.getFriendId();
        Forcus focus1 = forcusMapper.ifForcus(id1,id2);
        if (focus1 != null){
            return true;
        }
        else{
            return false;
        }
    }
}
