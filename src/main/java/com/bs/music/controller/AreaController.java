package com.bs.music.controller;

import com.bs.music.model.Area;
import com.bs.music.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created by wyn on 2016/5/8.
 */
@Controller
public class AreaController {
    @Autowired
    private AreaService areaService;

    /**
     *  地区列表（备用方法）
     * @return
     */
    public List<Area> showAllArea(){
     return  areaService.getAll();
    }
}
