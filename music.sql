/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50018
Source Host           : localhost:3306
Source Database       : music

Target Server Type    : MYSQL
Target Server Version : 50018
File Encoding         : 65001

Date: 2016-06-02 15:18:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `id` int(11) NOT NULL auto_increment,
  `song` int(11) default NULL,
  `owner` int(11) default NULL,
  `collect_time` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `col_song_fk` (`song`),
  KEY `col_user_fk` (`owner`),
  CONSTRAINT `fk_owner_collect` FOREIGN KEY (`owner`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_song_collect` FOREIGN KEY (`song`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES ('1', '3', '8', '2016-06-02 14:44:59');
INSERT INTO `collect` VALUES ('2', '2', '8', '2016-06-02 14:45:00');
INSERT INTO `collect` VALUES ('3', '4', '8', '2016-06-02 14:45:01');
INSERT INTO `collect` VALUES ('4', '1', '9', '2016-06-02 14:51:16');

-- ----------------------------
-- Table structure for download
-- ----------------------------
DROP TABLE IF EXISTS `download`;
CREATE TABLE `download` (
  `id` int(11) NOT NULL auto_increment,
  `song` int(11) default NULL,
  `owner` int(11) default NULL,
  `download_time` datetime default NULL,
  `download_url` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  KEY `download_user_fk` (`owner`),
  KEY `download_song_fk` (`song`),
  CONSTRAINT `fk_owner_download` FOREIGN KEY (`owner`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_song_download` FOREIGN KEY (`song`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of download
-- ----------------------------
INSERT INTO `download` VALUES ('1', '38', '7', '2016-06-02 14:43:26', null);
INSERT INTO `download` VALUES ('2', '4', '8', '2016-06-02 14:45:25', null);

-- ----------------------------
-- Table structure for forcus
-- ----------------------------
DROP TABLE IF EXISTS `forcus`;
CREATE TABLE `forcus` (
  `id` int(11) NOT NULL auto_increment,
  `this_id` int(11) default NULL,
  `friend_id` int(11) default NULL,
  PRIMARY KEY  (`id`),
  KEY `focus_thisid_fk` (`this_id`),
  KEY `focus_firend_fk` (`friend_id`),
  CONSTRAINT `fk_thisid_focus` FOREIGN KEY (`this_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_friend_focus` FOREIGN KEY (`friend_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of forcus
-- ----------------------------
INSERT INTO `forcus` VALUES ('1', '8', '7');
INSERT INTO `forcus` VALUES ('2', '9', '8');

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(11) NOT NULL auto_increment,
  `song` int(11) default NULL,
  `owner` int(11) default NULL,
  `do_time` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `hi_song_fk` (`song`),
  KEY `hi_user_fk` (`owner`),
  CONSTRAINT `fk_owner_history` FOREIGN KEY (`owner`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_song_history` FOREIGN KEY (`song`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('1', '1', '7', '2016-06-02 14:42:23');
INSERT INTO `history` VALUES ('2', '1', '9', '2016-06-02 14:51:00');
INSERT INTO `history` VALUES ('3', '2', '9', '2016-06-02 14:51:01');
INSERT INTO `history` VALUES ('4', '3', '9', '2016-06-02 14:51:02');
INSERT INTO `history` VALUES ('5', '4', '9', '2016-06-02 14:51:02');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL auto_increment,
  `sender` int(11) default NULL,
  `receiver` int(11) default NULL,
  `song` int(11) default NULL,
  `content` varchar(255) character set utf8 default NULL,
  `push_time` datetime default NULL,
  `if_read` int(11) default NULL,
  PRIMARY KEY  (`id`),
  KEY `message_receiver_fk` (`receiver`),
  KEY `message_sender_fk` (`sender`),
  KEY `message_song_fk` (`song`),
  CONSTRAINT `fk_receiver_message` FOREIGN KEY (`receiver`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('4', null, '1', null, '亲爱的 admin 用户 新歌Not Ready 4 Goodbye上架了哦', '2016-06-02 15:16:20', null);
INSERT INTO `message` VALUES ('5', null, '7', null, '亲爱的 花想容 用户 新歌Not Ready 4 Goodbye上架了哦', '2016-06-02 15:16:24', null);
INSERT INTO `message` VALUES ('6', null, '8', null, '亲爱的 小黑 用户 新歌Not Ready 4 Goodbye上架了哦', '2016-06-02 15:16:27', null);
INSERT INTO `message` VALUES ('7', null, '9', null, '亲爱的 呱呱 用户 新歌Not Ready 4 Goodbye上架了哦', '2016-06-02 15:16:27', null);

-- ----------------------------
-- Table structure for singer
-- ----------------------------
DROP TABLE IF EXISTS `singer`;
CREATE TABLE `singer` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(100) default NULL,
  `sex` varchar(2) default NULL,
  `area` int(10) default NULL,
  `protait` varchar(200) default NULL,
  `search` int(11) default NULL,
  PRIMARY KEY  (`id`),
  KEY `singer_area_fk` (`area`),
  CONSTRAINT `singer_area_fk` FOREIGN KEY (`area`) REFERENCES `singer_area` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of singer
-- ----------------------------
INSERT INTO `singer` VALUES ('1', '许巍', '男', '1', 'img/xw.jpg', '9');
INSERT INTO `singer` VALUES ('2', '朴树', '男', '1', 'img/ps.jpg', '8');
INSERT INTO `singer` VALUES ('3', '邓紫棋', '女', '2', 'img/dzq.jpg', '7');
INSERT INTO `singer` VALUES ('4', '庾澄庆', '男', '1', 'img/ycq.jpg', '6');
INSERT INTO `singer` VALUES ('5', '薛之谦', '男', '1', 'img/xzq2.jpg', '5');
INSERT INTO `singer` VALUES ('6', '权志龙', '男', '4', 'img/pic.jpg', '4');
INSERT INTO `singer` VALUES ('7', '陈奕迅', '男', '2', 'img/cyx.jpg', '10');
INSERT INTO `singer` VALUES ('8', '汪苏泷', '男', '1', 'img/wsl.jpg', '2');
INSERT INTO `singer` VALUES ('9', 'T-ara', '女', '4', 'img/tara.jpg', '3');
INSERT INTO `singer` VALUES ('10', 'Maroon 5', '男', '5', 'img/Mar5.jpg', '2');
INSERT INTO `singer` VALUES ('11', 'Avril Lavigne', '女', '5', 'img/awl.jpg', '2');
INSERT INTO `singer` VALUES ('12', 'All 4 One', '男', '5', 'img/all4o.jpg', '2');

-- ----------------------------
-- Table structure for singer_area
-- ----------------------------
DROP TABLE IF EXISTS `singer_area`;
CREATE TABLE `singer_area` (
  `id` int(11) NOT NULL,
  `name` varchar(255) character set utf8 default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of singer_area
-- ----------------------------
INSERT INTO `singer_area` VALUES ('1', '中国大陆');
INSERT INTO `singer_area` VALUES ('2', '中国香港');
INSERT INTO `singer_area` VALUES ('3', '中国台湾');
INSERT INTO `singer_area` VALUES ('4', '韩国');
INSERT INTO `singer_area` VALUES ('5', '欧美');

-- ----------------------------
-- Table structure for song
-- ----------------------------
DROP TABLE IF EXISTS `song`;
CREATE TABLE `song` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) default NULL,
  `singer` int(11) default NULL,
  `search_count` int(11) default '0',
  `collect_count` int(11) default '0',
  `play_count` int(11) default '0',
  `download_count` int(11) default '0',
  `price` int(10) default NULL,
  `type` int(11) default NULL,
  `song_url` varchar(255) default NULL,
  `time_length` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  KEY `song_singer_fk` (`singer`),
  KEY `song_type_fk` (`type`),
  CONSTRAINT `fk_song_type` FOREIGN KEY (`type`) REFERENCES `song_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_song_singer` FOREIGN KEY (`singer`) REFERENCES `singer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of song
-- ----------------------------
INSERT INTO `song` VALUES ('1', 'Mascara', '3', '0', '2', '6', '0', '12', '1', 'G.E.M.邓紫棋 - Mascara.mp3', '04:07');
INSERT INTO `song` VALUES ('2', 'Sleep Alone', '7', '0', '1', '4', '1', '12', '1', '陈奕迅 - Sleep Alone.mp3', '02:25');
INSERT INTO `song` VALUES ('3', 'New Boy', '2', '0', '2', '5', '1', '12', '1', '朴树 - New Boy.mp3', '03:41');
INSERT INTO `song` VALUES ('4', '故乡', '1', '0', '1', '4', '2', '12', '1', '许巍 - 故乡.mp3', '05:16');
INSERT INTO `song` VALUES ('5', 'Today', '6', '0', '0', '1', '0', '12', '1', '权志龙 - Today.mp3', '04:30');
INSERT INTO `song` VALUES ('36', '灵主不悔', '8', '0', '0', '1', '1', '22', '1', '汪苏泷 - 灵主不悔.mp3', '03:41');
INSERT INTO `song` VALUES ('38', 'sexy love', '9', '0', '0', '1', '3', '7', '4', 'T-ara - Sexy Love - 2013 MBC韩国仁川演唱会.mp3', '03:43');
INSERT INTO `song` VALUES ('39', 'Sugar', '10', '0', '0', '1', '1', '7', '5', 'Maroon 5 - Sugar.mp3', '03:56');
INSERT INTO `song` VALUES ('40', 'Not Ready 4 Goodbye', '12', '0', '0', '0', '0', '12', '1', 'All 4 One - Not Ready 4 Goodbye.mp3', '04:12');

-- ----------------------------
-- Table structure for song_type
-- ----------------------------
DROP TABLE IF EXISTS `song_type`;
CREATE TABLE `song_type` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(10) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of song_type
-- ----------------------------
INSERT INTO `song_type` VALUES ('1', '抒情');
INSERT INTO `song_type` VALUES ('2', '轻音乐');
INSERT INTO `song_type` VALUES ('3', '欧美');
INSERT INTO `song_type` VALUES ('4', '日韩');
INSERT INTO `song_type` VALUES ('5', '电子');

-- ----------------------------
-- Table structure for upload
-- ----------------------------
DROP TABLE IF EXISTS `upload`;
CREATE TABLE `upload` (
  `id` int(11) NOT NULL auto_increment,
  `song` int(11) default NULL,
  `uploadTime` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `upload_song_fk` (`song`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of upload
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) default NULL,
  `password` varchar(50) default NULL,
  `type` int(11) default NULL,
  `birthday` date default NULL,
  `portrait` varchar(50) default NULL,
  `phone` varchar(50) default NULL,
  `sex` varchar(10) default NULL,
  `email` varchar(50) default NULL,
  `asset` int(10) default NULL,
  `download_count` int(11) default NULL,
  `friend_count` int(11) default NULL,
  `fans_count` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', 'admin', 'admin', null, null, null, null, null, 'admin@music.com', '0', '0', '0', '0');
INSERT INTO `user_info` VALUES ('7', '花想容', 'asd123', null, null, 'img/Tulips.jpg', null, null, 'hxr@gmail.com', '993', '0', '0', '1');
INSERT INTO `user_info` VALUES ('8', '小黑', 'asd123', null, null, 'img/Koala.jpg', null, null, 'hei@gmail.com', '38', '0', '1', '1');
INSERT INTO `user_info` VALUES ('9', '呱呱', 'asd123', null, null, 'img/Penguins.jpg', null, null, 'gua@gmail.com', '5000', '0', '1', '0');
