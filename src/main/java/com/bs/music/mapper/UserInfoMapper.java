package com.bs.music.mapper;

import com.bs.music.model.UserInfo;
import com.bs.music.util.AllMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * Created by RI01796 on 2016/4/6.
 */
public interface UserInfoMapper extends AllMapper<UserInfo> {

    @Select("select id ,name,password,type,birthday,portrait,phone,sex,email,asset,download_count as downloadCount,friend_count as friendCount,fans_count as fansCount\n" +
            " from user_info where email = #{email}")
    UserInfo selectByEmail(@Param("email") String  email);

    @Select("select id ,name,password,type,birthday,portrait,phone,sex,email,asset,download_count as downloadCount,friend_count as friendCount,fans_count as fansCount\n" +
            " from user_info where name = #{name}")
    UserInfo selectByName(@Param("name") String  name);
}
