package com.bs.music.util;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * 通用mapper
 * @param <T>
 */
public interface AllMapper<T> extends Mapper<T>, MySqlMapper<T> {

}
