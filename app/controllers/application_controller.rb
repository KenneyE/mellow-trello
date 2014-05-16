class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :logged_in?

  private
  def current_user
    session_token = session[:session_token]
    return nil if session_token.nil?
    @current_user ||= User.find_by_session_token(session_token)
  end

  def login(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout
    session[:session_token] = nil
    current_user.reset_session_token! if logged_in?
  end

  def logged_in?
    !!current_user
  end

  def require_login!
    redirect_to new_session_url unless current_user
  end
end
