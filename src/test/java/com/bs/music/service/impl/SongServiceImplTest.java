package com.bs.music.service.impl;

import com.bs.music.model.SongInfo;
import com.bs.music.service.SongService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/** 
* SongServiceImpl Tester. 
* 
* @author <Authors name> 
* @since <pre>���� 7, 2016</pre> 
* @version 1.0 
*/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class SongServiceImplTest {
      private static final Logger LOGGER = Logger.getLogger(SongServiceImplTest.class);

    @Autowired
    private SongService songService;

    @Test
    public void testInsert() throws Exception {
        SongInfo songInfo = new SongInfo();
        songInfo.setName("rember the name");
        Object o = songService.save(songInfo);
        LOGGER.info(o);
    }

    @Test
    public void testOrder() throws Exception {
        Object o = songService.selectAny("许巍",1,1);
    /*  Object o = songService.getOrder("collect_count",1,10);*/
        LOGGER.info(o);
    }

    @Test
    public void testName() throws Exception {
        Object o = songService.selectSongInfo(2,3,null);
        LOGGER.info(o);
    }
}
