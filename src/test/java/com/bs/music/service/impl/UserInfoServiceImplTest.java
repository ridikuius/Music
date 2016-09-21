package com.bs.music.service.impl;

import com.bs.music.mapper.UserInfoMapper;
import com.bs.music.model.UserInfo;
import com.bs.music.service.UserInfoService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


/**
 * UserInfoServiceImpl Tester.
 *
 * @author <Authors name>
 * @version 1.0
 * @since <pre>���� 6, 2016</pre>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class UserInfoServiceImplTest {

    private static final Logger LOGGER = Logger.getLogger(UserInfoServiceImplTest.class);
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private UserInfoMapper userInfoMapper;

    /**
     * Method: selectByKey(Object key)
     */
    @Test
    public void testSelectByKey() throws Exception {

        UserInfo userInfo = new UserInfo();
        userInfo.setId(1);
        Object o = userInfoService.query(userInfo);
        LOGGER.info(o);
    }

    @Test
    public void testInsert() throws Exception {
        UserInfo userInfo = new UserInfo();
        userInfo.setName("罗");
        userInfo.setPassword("1234567");
        userInfo.setSex("male");
        Object o = userInfoService.save(userInfo);
        LOGGER.info(o);
    }

    @Test
    public void testdelete() throws Exception {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(4);
        Object o = userInfoService.delete(userInfo);
        LOGGER.info(o);
    }

    @Test
    public void testupdate() throws Exception {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(1);
        userInfo.setName("路飞");
        //修改指定值
        Object o = userInfoService.updateNotNull(userInfo);
        //修改全部值
        Object o2 = userInfoService.updateAll(userInfo);
        LOGGER.info(o);
    }

    @Test
    public void testGet() throws Exception {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(4);
        Object  o = userInfoMapper.delete(userInfo);
        LOGGER.info(o);

    }
}
