package com.bs.music.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.Serializable;

public class SessionServiceImpl implements SessionService {

	@Override
	public void setAttribute(HttpServletRequest request, String key,
			Serializable value) {
		HttpSession session = request.getSession();
		if(session != null){
			session.setAttribute(key, value);
		}
	}

	@Override
	public Serializable getAttribute(HttpServletRequest request, String key) {
		HttpSession session = request.getSession();
		if(session != null){
			return (Serializable) session.getAttribute(key);
		}
		return null;
	}

	@Override
	public void logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		if(session != null){
			session.invalidate();
		}
	}

	@Override
	public String getSessionID(HttpServletRequest request) {
		return request.getRequestedSessionId();
	}

}
