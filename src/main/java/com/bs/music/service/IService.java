

package com.bs.music.service;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 通用接口
 * Created by wangyanan on 2014/12/11.
 */
@Service
public interface IService<T> {

    T selectByKey(Object key);

    int save(T entity);

    int delete(T entity);

    int updateAll(T entity);

    int updateNotNull(T entity);

    List<T> selectByExample(Object example);

    List<T> query(T entity);

    //TODO 其他...
}
