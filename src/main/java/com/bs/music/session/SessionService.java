package com.bs.music.session;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;

public interface SessionService {
	public void setAttribute(HttpServletRequest request, String key, Serializable value);
	
	public Serializable getAttribute(HttpServletRequest request, String key);
	
	public void logout(HttpServletRequest request);
	
	public String getSessionID(HttpServletRequest request);
}
